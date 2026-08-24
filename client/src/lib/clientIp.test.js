import { describe, expect, it } from 'vitest'
import { clientIp } from './clientIp'

const from = (entries) => new Headers(entries)

describe('clientIp', () => {
  it('prefiere el encabezado que pone la plataforma antes que el del cliente', () => {
    const headers = from({
      'x-vercel-forwarded-for': '203.0.113.7',
      'x-forwarded-for': '1.1.1.1',
    })

    expect(clientIp(headers)).toBe('203.0.113.7')
  })

  it('cae a x-real-ip cuando no está el de Vercel', () => {
    expect(clientIp(from({ 'x-real-ip': '203.0.113.9', 'x-forwarded-for': '1.1.1.1' })))
      .toBe('203.0.113.9')
  })

  // El corazón del asunto: con el primer valor de la lista, cualquiera se
  // inventa una IP nueva por request y el límite por IP deja de existir.
  it('de x-forwarded-for toma el último salto, no el que eligió el cliente', () => {
    const headers = from({ 'x-forwarded-for': '6.6.6.6, 10.0.0.1, 203.0.113.7' })

    expect(clientIp(headers)).toBe('203.0.113.7')
  })

  it('un solo valor en x-forwarded-for se usa tal cual', () => {
    expect(clientIp(from({ 'x-forwarded-for': '203.0.113.7' }))).toBe('203.0.113.7')
  })

  it('tolera espacios y valores vacíos en la lista', () => {
    expect(clientIp(from({ 'x-forwarded-for': ' 1.1.1.1 ,  , 203.0.113.7 ' }))).toBe('203.0.113.7')
  })

  it('sin ningún encabezado devuelve un valor conocido, no undefined', () => {
    // Todas las peticiones sin encabezado caen en el mismo cubo del rate
    // limit, que es lo correcto: es un solo origen desconocido.
    expect(clientIp(from({}))).toBe('unknown')
  })

  it('un encabezado presente pero vacío no gana sobre los siguientes', () => {
    expect(clientIp(from({ 'x-vercel-forwarded-for': '', 'x-real-ip': '203.0.113.9' })))
      .toBe('203.0.113.9')
  })
})
