import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './Contact'
import { SettingsProvider } from '../_settings/SettingsProvider'

function renderContact() {
  return render(
    <SettingsProvider>
      <Contact />
    </SettingsProvider>
  )
}

function jsonResponse(body: unknown, ok: boolean, status = 200) {
  return { ok, status, json: () => Promise.resolve(body) } as Response
}

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('Contact', () => {
  it('camino feliz: limpia el formulario y muestra el mensaje de éxito', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ message: 'ok' }, true))
    const user = userEvent.setup()
    renderContact()

    await user.type(screen.getByLabelText('Email'), 'tomas@example.com')
    await user.type(screen.getByLabelText('Teléfono'), '+54 11 1234-5678')
    await user.type(screen.getByLabelText('¿En qué puedo ayudarte?'), 'Hola, quiero contactarte.')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(await screen.findByRole('status')).toHaveTextContent('¡Mensaje enviado exitosamente!')
    expect(screen.getByLabelText('Email')).toHaveValue('')
    expect(screen.getByLabelText('Teléfono')).toHaveValue('')
    expect(screen.getByLabelText('¿En qué puedo ayudarte?')).toHaveValue('')

    expect(fetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' })
    )
  })

  it('muestra el error que devuelve el servidor sin limpiar el formulario', async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      jsonResponse({ error: 'Demasiados intentos, esperá un momento.' }, false, 429)
    )
    const user = userEvent.setup()
    renderContact()

    await user.type(screen.getByLabelText('Email'), 'tomas@example.com')
    await user.type(screen.getByLabelText('Teléfono'), '+54 11 1234-5678')
    await user.type(screen.getByLabelText('¿En qué puedo ayudarte?'), 'Hola de nuevo.')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Demasiados intentos, esperá un momento.')
    // El formulario no se vació: el usuario no perdió lo que había escrito.
    expect(screen.getByLabelText('Email')).toHaveValue('tomas@example.com')
  })

  it('traduce la falla de red en vez de mostrar el "Failed to fetch" del navegador', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new TypeError('Failed to fetch'))
    const user = userEvent.setup()
    renderContact()

    await user.type(screen.getByLabelText('Email'), 'tomas@example.com')
    await user.type(screen.getByLabelText('Teléfono'), '+54 11 1234-5678')
    await user.type(screen.getByLabelText('¿En qué puedo ayudarte?'), 'Sin conexión.')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    expect(await screen.findByRole('alert')).toHaveTextContent('Error de conexión')
  })

  it('el contador de caracteres marca el límite al llegar a 500', () => {
    renderContact()

    const textarea = screen.getByLabelText('¿En qué puedo ayudarte?')
    const message = 'a'.repeat(500)
    fireEvent.change(textarea, { target: { value: message } })

    expect(screen.getByText('500/500')).toHaveClass('form__counter--full')
  })

  it('el contador no marca el límite por debajo de 500', () => {
    renderContact()

    const textarea = screen.getByLabelText('¿En qué puedo ayudarte?')
    fireEvent.change(textarea, { target: { value: 'a'.repeat(10) } })

    expect(screen.getByText('10/500')).not.toHaveClass('form__counter--full')
  })
})
