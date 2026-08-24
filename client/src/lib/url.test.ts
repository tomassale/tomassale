import { describe, expect, it } from 'vitest'
import { safeHref } from './url'

describe('safeHref', () => {
  it('devuelve undefined para entrada vacía o ausente', () => {
    expect(safeHref('')).toBeUndefined()
    expect(safeHref(undefined)).toBeUndefined()
  })

  it('acepta rutas relativas del propio sitio', () => {
    expect(safeHref('/img/projects/Bytek.webp')).toBe('/img/projects/Bytek.webp')
  })

  it('acepta esquemas http, https y mailto', () => {
    expect(safeHref('http://example.com')).toBe('http://example.com')
    expect(safeHref('https://example.com/path?x=1')).toBe('https://example.com/path?x=1')
    expect(safeHref('mailto:tomas@example.com')).toBe('mailto:tomas@example.com')
  })

  it('recorta espacios antes de evaluar el esquema', () => {
    expect(safeHref('  https://example.com  ')).toBe('https://example.com')
  })

  it('neutraliza esquemas peligrosos', () => {
    expect(safeHref('javascript:alert(1)')).toBeUndefined()
    expect(safeHref('data:text/html,<script>alert(1)</script>')).toBeUndefined()
    expect(safeHref('vbscript:msgbox(1)')).toBeUndefined()
  })

  it('devuelve undefined para strings que no son una URL válida', () => {
    expect(safeHref('no es una url')).toBeUndefined()
  })
})
