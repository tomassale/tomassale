import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import TerminosPage from './page'
import { SettingsProvider } from '../_components/_settings/SettingsProvider'
import { legalDocuments } from '@/lib/legal'

function renderTerminos() {
  render(
    <SettingsProvider>
      <TerminosPage />
    </SettingsProvider>
  )
}

describe('TerminosPage', () => {
  it('publica todas las secciones del documento en español', () => {
    renderTerminos()

    expect(screen.getByRole('heading', { level: 1, name: 'Términos y condiciones' })).toBeInTheDocument()
    for (const section of legalDocuments.es.sections) {
      expect(screen.getByRole('heading', { level: 2, name: section.heading })).toBeInTheDocument()
    }
  })

  it('muestra la fecha de la versión en la zona en que fue escrita', () => {
    renderTerminos()

    // La fecha llega como 'YYYY-MM-DD' (medianoche UTC): sin fijar la zona,
    // en Argentina se mostraría el día anterior.
    expect(screen.getByText(/Última actualización: 24 de agosto de 2026/)).toBeInTheDocument()
  })

  it('deja siempre una salida hacia el portfolio', () => {
    renderTerminos()

    expect(screen.getByRole('link', { name: /Volver al inicio/ })).toHaveAttribute('href', '/')
  })

  it('sigue el idioma guardado en el sitio, no el de la ruta', async () => {
    // La ruta es una sola para los dos idiomas: quien eligió inglés en el
    // recorrido tiene que leer el documento en inglés al llegar acá.
    localStorage.setItem('lang', 'en')
    renderTerminos()

    expect(
      await screen.findByRole('heading', { level: 1, name: legalDocuments.en.title })
    ).toBeInTheDocument()
    expect(screen.queryByText(legalDocuments.es.title)).not.toBeInTheDocument()
  })
})
