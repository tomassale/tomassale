import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsControls from './SettingsControls'
import { SettingsProvider } from './SettingsProvider'

// Usamos el provider real: es estado de la propia app (no un servicio
// externo), así que probamos el flujo completo botón -> contexto -> DOM.
function renderControls() {
  return render(
    <SettingsProvider>
      <SettingsControls />
    </SettingsProvider>
  )
}

beforeEach(() => {
  localStorage.clear()
})

describe('SettingsControls', () => {
  it('alterna el idioma: cambia el label del botón y el atributo lang del documento', async () => {
    const user = userEvent.setup()
    renderControls()

    const langButton = screen.getByRole('button', { name: /switch to english/i })
    expect(langButton).toHaveTextContent('EN')
    expect(document.documentElement).toHaveAttribute('lang', 'es')

    await user.click(langButton)

    expect(screen.getByRole('button', { name: /cambiar a español/i })).toHaveTextContent('ES')
    expect(document.documentElement).toHaveAttribute('lang', 'en')
  })

  it('alterna el tema: cambia el label del botón y data-theme del documento', async () => {
    const user = userEvent.setup()
    renderControls()

    const themeButton = screen.getByRole('button', { name: /modo claro/i })
    expect(themeButton).toHaveTextContent('☀')
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark')

    await user.click(themeButton)

    expect(screen.getByRole('button', { name: /modo oscuro/i })).toHaveTextContent('☾')
    expect(document.documentElement).toHaveAttribute('data-theme', 'light')
  })
})
