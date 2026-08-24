import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import NotFound from './not-found'
import { SettingsProvider } from './_components/_settings/SettingsProvider'

function renderNotFound() {
  render(
    <SettingsProvider>
      <NotFound />
    </SettingsProvider>
  )
}

describe('NotFound', () => {
  it('anuncia el error con un encabezado, no solo con el número', () => {
    renderNotFound()

    expect(screen.getByRole('heading', { level: 1, name: 'Acá no hay nada' })).toBeInTheDocument()
  })

  it('ofrece la vuelta al inicio', () => {
    renderNotFound()

    expect(screen.getByRole('link', { name: 'Volver al inicio' })).toHaveAttribute('href', '/')
  })

  it('los signos de la etiqueta no se leen: son decoración', () => {
    renderNotFound()

    // El código se escribe como <404/> para rimar con el logo; el lector de
    // pantalla tiene que oír "404", no "menor que 404 barra mayor que".
    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
