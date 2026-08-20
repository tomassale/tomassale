import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, act } from '@testing-library/react'
import CursorTrail from './CursorTrail'

/** Deja que solo las media queries indicadas den positivo. */
function stubMedia(...matching: string[]) {
  window.matchMedia = ((query: string) => ({
    matches: matching.includes(query),
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

const FINE = '(pointer: fine)'

afterEach(() => {
  vi.restoreAllMocks()
  document.documentElement.classList.remove('has-cursorTrail')
})

describe('CursorTrail', () => {
  it('no dibuja nada ni apaga el puntero del sistema si no hay mouse', () => {
    stubMedia()
    const { container } = render(<CursorTrail />)

    expect(container).toBeEmptyDOMElement()
    expect(document.documentElement).not.toHaveClass('has-cursorTrail')
  })

  it('con un puntero fino dibuja el cursor y apaga el del sistema', () => {
    stubMedia(FINE)
    const { container } = render(<CursorTrail />)

    expect(container.querySelector('.cursorTrail__dot')).toBeInTheDocument()
    expect(container.querySelector('.cursorTrail__ring')).toBeInTheDocument()
    expect(document.documentElement).toHaveClass('has-cursorTrail')
  })

  // Si el componente se va sin devolver el puntero, la página queda sin cursor.
  it('devuelve el puntero del sistema al desmontarse', () => {
    stubMedia(FINE)
    const { unmount } = render(<CursorTrail />)
    unmount()

    expect(document.documentElement).not.toHaveClass('has-cursorTrail')
  })

  it('cambia de forma según lo que haya debajo del puntero', () => {
    stubMedia(FINE)
    const link = document.createElement('a')
    link.href = '#'
    document.body.appendChild(link)

    const { container } = render(<CursorTrail />)
    const trail = () => container.firstElementChild!

    act(() => {
      window.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', bubbles: true }))
    })
    expect(trail()).toHaveClass('cursorTrail--idle')

    // El evento se despacha desde el enlace: el hook mira su target.
    act(() => {
      link.dispatchEvent(new PointerEvent('pointermove', { pointerType: 'mouse', bubbles: true }))
    })
    expect(trail()).toHaveClass('cursorTrail--interactive')

    act(() => {
      window.dispatchEvent(new PointerEvent('pointerdown', { pointerType: 'mouse', bubbles: true }))
    })
    expect(trail()).toHaveClass('cursorTrail--pressed')

    link.remove()
  })
})
