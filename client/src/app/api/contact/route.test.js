import { beforeEach, describe, expect, it, vi } from 'vitest'

// Nunca abrir un transporte SMTP real: mockeamos el wrapper de nodemailer.
vi.mock('@/lib/nodemailer', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@/lib/logger', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const { POST } = await import('./route.js')
const { sendEmail } = await import('@/lib/nodemailer')
const { logger } = await import('@/lib/logger')

const validBody = {
  email: 'tomas@example.com',
  number: '+54 11 1234-5678',
  message: 'Hola, quiero contactarte.',
}

beforeEach(() => {
  sendEmail.mockClear()
  sendEmail.mockResolvedValue(undefined)
})

// El rate limiter vive a nivel de módulo y persiste durante todo el archivo:
// cada test usa una IP propia y nunca repetida para no heredar los intentos
// consumidos por otro test.
function makeRequest({ body, contentType = 'application/json', contentLength, ip }) {
  const payload = body === undefined ? undefined : typeof body === 'string' ? body : JSON.stringify(body)
  const headers = { 'x-forwarded-for': ip }
  if (contentType !== null) headers['content-type'] = contentType
  if (payload !== undefined) {
    headers['content-length'] = String(contentLength ?? Buffer.byteLength(payload))
  }

  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers,
    ...(payload !== undefined ? { body: payload } : {}),
  })
}

describe('POST /api/contact', () => {
  it('415 cuando el Content-Type no es JSON', async () => {
    const res = await POST(makeRequest({ body: validBody, contentType: 'text/plain', ip: '1.1.1.1' }))

    expect(res.status).toBe(415)
    expect((await res.json()).error).toBe('Content-Type no soportado')
  })

  it('413 cuando el content-length declarado supera 10.000', async () => {
    const res = await POST(makeRequest({ body: validBody, contentLength: 10_001, ip: '1.1.1.2' }))

    expect(res.status).toBe(413)
    expect((await res.json()).error).toBe('Payload demasiado grande')
  })

  // El encabezado lo escribe quien llama: declarar 5 bytes y mandar 20.000 es
  // gratis. Si el tope se midiera solo sobre lo declarado, el cuerpo entero
  // se acumularía en memoria antes de que nadie lo revisara.
  it('413 cuando el content-length declarado miente sobre el tamaño real', async () => {
    const res = await POST(
      makeRequest({ body: JSON.stringify({ message: 'a'.repeat(20_000) }), contentLength: 5, ip: '1.1.1.20' })
    )

    expect(res.status).toBe(413)
    expect((await res.json()).error).toBe('Payload demasiado grande')
  })

  it('400 —no 500— cuando el JSON está roto, y el cuerpo recibido no llega al log', async () => {
    const res = await POST(makeRequest({ body: '{"email": "AAAAAAAAAA', ip: '1.1.1.21' }))

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('Formato de datos inválido')

    // El mensaje de error de V8 arrastra un fragmento del cuerpo: loguearlo
    // deja escribir en los logs a cualquiera que mande basura.
    const logged = logger.warn.mock.calls.flat().join(' ')
    expect(logged).not.toContain('AAAAAAAAAA')
  })

  it('400 cuando faltan campos obligatorios', async () => {
    const res = await POST(
      makeRequest({ body: { email: '', number: '', message: '' }, ip: '1.1.1.3' })
    )

    expect(res.status).toBe(400)
    expect((await res.json()).error).toBe('Faltan campos obligatorios')
  })

  it('400 cuando el email tiene formato inválido', async () => {
    const res = await POST(makeRequest({ body: { ...validBody, email: 'no-es-email' }, ip: '1.1.1.4' }))

    expect(res.status).toBe(400)
  })

  it('400 cuando el teléfono tiene formato inválido', async () => {
    const res = await POST(makeRequest({ body: { ...validBody, number: 'abc' }, ip: '1.1.1.5' }))

    expect(res.status).toBe(400)
  })

  it('400 cuando el mensaje excede el largo máximo', async () => {
    const res = await POST(
      makeRequest({ body: { ...validBody, message: 'a'.repeat(501) }, ip: '1.1.1.6' })
    )

    expect(res.status).toBe(400)
  })

  it('200 en el camino feliz y llama a sendEmail con el objeto saneado, no con el body crudo', async () => {
    const res = await POST(makeRequest({ body: { ...validBody, isAdmin: true }, ip: '1.1.1.7' }))
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.message).toBe('Email sent successfully')
    expect(sendEmail).toHaveBeenCalledTimes(1)
    expect(sendEmail).toHaveBeenCalledWith(validBody)
  })

  it('500 cuando sendEmail rechaza', async () => {
    sendEmail.mockRejectedValueOnce(new Error('smtp down'))

    const res = await POST(makeRequest({ body: validBody, ip: '1.1.1.8' }))
    const data = await res.json()

    expect(res.status).toBe(500)
    expect(data.error).toBe('Error sending email')
  })

  it('429 al superar el límite de intentos por IP dentro de la ventana', async () => {
    const ip = '1.1.1.9'

    for (let i = 0; i < 3; i++) {
      const res = await POST(makeRequest({ body: validBody, ip }))
      expect(res.status).toBe(200)
    }

    const blocked = await POST(makeRequest({ body: validBody, ip }))
    const data = await blocked.json()

    expect(blocked.status).toBe(429)
    expect(data.error).toBe('Demasiados intentos, esperá un momento.')
  })

  it('el límite de intentos es independiente por IP', async () => {
    for (let i = 0; i < 3; i++) {
      await POST(makeRequest({ body: validBody, ip: '2.2.2.2' }))
    }
    // Una IP distinta no está afectada por los intentos agotados de la anterior.
    const res = await POST(makeRequest({ body: validBody, ip: '2.2.2.3' }))

    expect(res.status).toBe(200)
  })
})
