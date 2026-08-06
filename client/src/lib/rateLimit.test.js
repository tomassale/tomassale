import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// El Map de hits vive a nivel de módulo: resetModules + reimport en cada test
// para que ningún test arranque con IPs contaminadas de otro.
let rateLimit

beforeEach(async () => {
  vi.resetModules()
  vi.useFakeTimers()
  ;({ rateLimit } = await import('./rateLimit'))
})

afterEach(() => {
  vi.useRealTimers()
})

describe('rateLimit', () => {
  it('permite hasta el máximo de intentos por IP', () => {
    expect(rateLimit('1.1.1.1')).toBe(true)
    expect(rateLimit('1.1.1.1')).toBe(true)
    expect(rateLimit('1.1.1.1')).toBe(true)
  })

  it('bloquea el intento que supera el máximo', () => {
    rateLimit('1.1.1.1')
    rateLimit('1.1.1.1')
    rateLimit('1.1.1.1')
    expect(rateLimit('1.1.1.1')).toBe(false)
  })

  it('cuenta cada IP de forma independiente', () => {
    rateLimit('1.1.1.1')
    rateLimit('1.1.1.1')
    rateLimit('1.1.1.1')
    expect(rateLimit('1.1.1.1')).toBe(false)
    // otra IP arranca con su propio contador en cero
    expect(rateLimit('2.2.2.2')).toBe(true)
  })

  it('se libera para esa IP cuando pasa la ventana de un minuto', () => {
    rateLimit('1.1.1.1')
    rateLimit('1.1.1.1')
    rateLimit('1.1.1.1')
    expect(rateLimit('1.1.1.1')).toBe(false)

    vi.advanceTimersByTime(60_000 + 1)

    expect(rateLimit('1.1.1.1')).toBe(true)
  })
})
