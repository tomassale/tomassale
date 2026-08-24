import { beforeEach, describe, expect, it, vi } from 'vitest'

// El disco no participa: lo que se prueba es con qué criterio se elige el
// archivo, no que Node sepa leer una carpeta.
vi.mock('node:fs/promises', () => {
  const mocks = { readdir: vi.fn(), readFile: vi.fn(), stat: vi.fn() }
  // El módulo se importa con nombre en el handler y por defecto en otros
  // lados de la cadena: hay que ofrecer las dos formas.
  return { ...mocks, default: mocks }
})

vi.mock('@/lib/logger', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

const { GET } = await import('./route')
const { readdir, readFile, stat } = await import('node:fs/promises')

const readdirMock = vi.mocked(readdir)
const readFileMock = vi.mocked(readFile)
const statMock = vi.mocked(stat)

/** Una carpeta donde cada archivo tiene la fecha de modificación indicada. */
function givenDirectory(files: Record<string, number>) {
  readdirMock.mockResolvedValue(Object.keys(files) as never)
  statMock.mockImplementation(async (target) => {
    const name = String(target).split(/[\\/]/).pop()!
    return { mtimeMs: files[name] } as never
  })
  readFileMock.mockResolvedValue(Buffer.from('%PDF-1.7') as never)
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('GET /cv', () => {
  it('entrega el PDF más nuevo, se llame como se llame', async () => {
    givenDirectory({
      'Tomas-Sale-CV.pdf': 1_000,
      'cv definitivo (2).pdf': 9_000,
      'Tomas Sale - Desarrollador Web.pdf': 5_000,
    })

    const response = await GET()

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('application/pdf')
    expect(response.headers.get('Content-Disposition')).toContain('cv definitivo (2).pdf')
  })

  it('ignora lo que no sea PDF', async () => {
    givenDirectory({ 'foto.png': 9_000, 'CV.pdf': 1_000 })

    const response = await GET()

    expect(response.headers.get('Content-Disposition')).toContain('CV.pdf')
  })

  it('responde 404 si no hay ningún PDF en la carpeta', async () => {
    givenDirectory({ 'foto.png': 1_000 })

    const response = await GET()

    expect(response.status).toBe(404)
    expect(readFileMock).not.toHaveBeenCalled()
  })

  it('no deja que el nombre del archivo parta el encabezado', async () => {
    // Un salto de línea en un encabezado corta la respuesta en dos.
    givenDirectory({ 'cv\r\nX-Injected: 1.pdf': 1_000 })

    const response = await GET()

    expect(response.headers.get('Content-Disposition')).not.toMatch(/[\r\n]/)
    expect(response.headers.get('X-Injected')).toBeNull()
  })
})
