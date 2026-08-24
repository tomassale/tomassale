import { afterEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useMarquee } from './useMarquee'

/** Lee el desplazamiento X que useMarquee escribe en `style.transform`. */
function readOffsetX(track: HTMLElement) {
  const match = track.style.transform.match(/translate3d\((-?[\d.]+)px/)
  return match ? parseFloat(match[1]) : 0
}

function Harness({ active = true }: { readonly active?: boolean }) {
  const { trackRef, handlers } = useMarquee(active)
  return (
    <div data-testid='wrapper' {...handlers}>
      <div data-testid='track' ref={trackRef}>
        <div>card A</div>
        <div>card B</div>
      </div>
    </div>
  )
}

describe('useMarquee', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('avanza la pista automáticamente con el tiempo', () => {
    vi.useFakeTimers()
    render(<Harness />)

    vi.advanceTimersByTime(1000)

    expect(readOffsetX(screen.getByTestId('track'))).toBeLessThan(0)
  })

  // Escribir el transform cuadro a cuadro invalida el estilo 60 veces por
  // segundo. Fuera de la vista eso se paga por algo que nadie está mirando.
  it('no gasta un solo cuadro mientras la franja no está a la vista', () => {
    vi.useFakeTimers()
    render(<Harness active={false} />)

    vi.advanceTimersByTime(2000)

    expect(screen.getByTestId('track').style.transform).toBe('')
  })

  it('el arrastre pausa el avance automático', () => {
    vi.useFakeTimers()
    render(<Harness />)
    const wrapper = screen.getByTestId('wrapper')
    const track = screen.getByTestId('track')

    vi.advanceTimersByTime(500)
    const beforeDrag = readOffsetX(track)

    fireEvent.pointerDown(wrapper, { button: 0, clientX: 0, pointerId: 1 })
    vi.advanceTimersByTime(3000) // sin pointermove: no debe avanzar solo mientras se arrastra

    expect(readOffsetX(track)).toBe(beforeDrag)
  })

  it('se reanuda recién a los 7s de soltar, no antes', () => {
    vi.useFakeTimers()
    render(<Harness />)
    const wrapper = screen.getByTestId('wrapper')
    const track = screen.getByTestId('track')

    fireEvent.pointerDown(wrapper, { button: 0, clientX: 0, pointerId: 1 })
    fireEvent.pointerUp(wrapper, { pointerId: 1 })
    const rightAfterRelease = readOffsetX(track)

    vi.advanceTimersByTime(6900) // todavía dentro de la ventana de inactividad
    expect(readOffsetX(track)).toBe(rightAfterRelease)

    vi.advanceTimersByTime(500) // supera los 7s: se reanuda
    expect(readOffsetX(track)).toBeLessThan(rightAfterRelease)
  })
})
