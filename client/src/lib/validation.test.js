import { describe, expect, it, vi } from 'vitest'

vi.mock('./logger', () => ({
  logger: { warn: vi.fn(), error: vi.fn(), info: vi.fn() },
}))

import validateContactForm from './validation'

const validData = {
  email: 'tomas@example.com',
  number: '+54 11 1234-5678',
  message: 'Hola, quiero contactarte.',
}

describe('validateContactForm', () => {
  it('acepta un payload válido y devuelve el objeto saneado', () => {
    const result = validateContactForm(validData)
    expect(result).toEqual({ isValid: true, data: validData })
  })

  it('descarta campos extra del body crudo', () => {
    const result = validateContactForm({ ...validData, isAdmin: true, extra: 'x' })
    expect(result.isValid).toBe(true)
    expect(result.data).toEqual(validData)
    expect(result.data).not.toHaveProperty('isAdmin')
    expect(result.data).not.toHaveProperty('extra')
  })

  it('rechaza cuando faltan campos', () => {
    const result = validateContactForm({ ...validData, message: '' })
    expect(result).toEqual({ isValid: false, error: 'Faltan campos obligatorios' })
  })

  it('rechaza cuando falta el body entero', () => {
    const result = validateContactForm(undefined)
    expect(result.isValid).toBe(false)
  })

  it('rechaza tipos que no son string', () => {
    const result = validateContactForm({ ...validData, message: 123 })
    expect(result).toEqual({ isValid: false, error: 'Formato de datos inválido' })
  })

  it('rechaza un email mal formado', () => {
    const result = validateContactForm({ ...validData, email: 'no-es-un-email' })
    expect(result.isValid).toBe(false)
    expect(result.error).toMatch(/formato/i)
  })

  it('rechaza un teléfono con formato inválido', () => {
    const result = validateContactForm({ ...validData, number: 'abc' })
    expect(result.isValid).toBe(false)
    expect(result.error).toMatch(/formato/i)
  })

  it('rechaza un mensaje que excede el máximo de 500 caracteres', () => {
    const result = validateContactForm({ ...validData, message: 'a'.repeat(501) })
    expect(result).toEqual({ isValid: false, error: 'Uno de los campos excede el largo permitido' })
  })

  it('acepta un mensaje justo en el límite de 500 caracteres', () => {
    const result = validateContactForm({ ...validData, message: 'a'.repeat(500) })
    expect(result.isValid).toBe(true)
  })
})
