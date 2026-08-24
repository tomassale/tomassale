import { describe, expect, it } from 'vitest'
import { legalDocuments, LEGAL_UPDATED } from './legal'

const LANGS = ['es', 'en'] as const

describe('legalDocuments', () => {
  it('los dos idiomas tienen las mismas secciones', () => {
    // Si alguien agrega una cláusula en un idioma y se olvida del otro, la
    // página muestra un documento distinto según quién la lea.
    expect(legalDocuments.en.sections).toHaveLength(legalDocuments.es.sections.length)
  })

  it.each(LANGS)('ningún texto queda vacío en %s', (lang) => {
    const doc = legalDocuments[lang]

    expect(doc.title.trim()).not.toBe('')
    expect(doc.intro.trim()).not.toBe('')

    for (const section of doc.sections) {
      expect(section.heading.trim()).not.toBe('')
      expect(section.paragraphs.length).toBeGreaterThan(0)
      for (const paragraph of section.paragraphs) {
        expect(paragraph.trim()).not.toBe('')
      }
    }
  })

  it.each(LANGS)('no queda ningún hueco sin redactar en %s', (lang) => {
    // El documento se publica entero: un marcador a la vista es peor que no
    // tener la página.
    const everything = legalDocuments[lang].sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
    ])

    for (const text of everything) {
      expect(text).not.toMatch(/\[(COMPLETAR|TODO|PENDIENTE)|LOREM IPSUM/i)
    }
  })

  it('la fecha de la versión es una fecha real en formato ISO corto', () => {
    expect(LEGAL_UPDATED).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    expect(Number.isNaN(new Date(LEGAL_UPDATED).getTime())).toBe(false)
  })
})
