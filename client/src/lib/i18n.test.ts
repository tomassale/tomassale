import { describe, expect, it } from 'vitest'
import { translations, translateCategory, translateNav, translateLink } from './i18n'

describe('translations', () => {
  it('define las mismas claves en español e inglés', () => {
    expect(Object.keys(translations.es).sort()).toEqual(Object.keys(translations.en).sort())
  })

  it('trae textos distintos por idioma para una misma clave', () => {
    expect(translations.es.submit).toBe('Enviar')
    expect(translations.en.submit).toBe('Submit')
  })
})

describe('translateCategory', () => {
  it('traduce una categoría conocida', () => {
    expect(translateCategory('es', 'Front-End')).toBe('Front-End')
    expect(translateCategory('en', 'DataBase')).toBe('Database')
  })

  it('devuelve la categoría original si no hay traducción (fallback)', () => {
    expect(translateCategory('es', 'Categoria-Inexistente')).toBe('Categoria-Inexistente')
  })
})

describe('translateNav', () => {
  it('traduce una referencia de navegación conocida', () => {
    expect(translateNav('es', 'contact', 'fallback')).toBe('Contacto')
    expect(translateNav('en', 'contact', 'fallback')).toBe('Contact')
  })

  it('usa el fallback provisto cuando la clave no existe', () => {
    expect(translateNav('es', 'ref-inexistente', 'Texto por defecto')).toBe('Texto por defecto')
  })
})

describe('translateLink', () => {
  it('traduce un alt de ícono conocido', () => {
    expect(translateLink('es', 'github', 'GitHub')).toBe('GitHub')
    expect(translateLink('en', 'linkedin', 'fallback')).toBe('LinkedIn')
  })

  it('usa el fallback cuando falta la clave', () => {
    expect(translateLink('es', 'icono-inexistente', 'Alt original')).toBe('Alt original')
  })
})
