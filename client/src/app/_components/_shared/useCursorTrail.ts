"use client"
import { useEffect, useRef, useState } from 'react'

/** Cuánto del camino que le falta recorre el anillo en cada cuadro. */
const RING_EASE = 0.18
const INTERACTIVE = 'a, button, [role="button"], select'
const TEXT_FIELD = 'input, textarea'
const DRAGGABLE = '.marquee'

/** Qué hay debajo del puntero: define la forma que toma el cursor. */
export type CursorTarget = 'idle' | 'interactive' | 'draggable' | 'text'

function targetUnder(node: EventTarget | null): CursorTarget {
  const element = node instanceof Element ? node : null
  if (!element) return 'idle'
  if (element.closest(TEXT_FIELD)) return 'text'
  if (element.closest(INTERACTIVE)) return 'interactive'
  if (element.closest(DRAGGABLE)) return 'draggable'
  return 'idle'
}

/**
 * Cursor propio: un punto que va pegado al mouse y un anillo que lo persigue
 * con retraso.
 *
 * La posición se escribe directo en el DOM desde el bucle de animación y no
 * en el estado de React: mover el puntero no puede costar un render por
 * cuadro. Al estado solo va lo que cambia de a ratos —qué hay debajo, si el
 * botón está apretado, si el mouse sigue en la ventana—, que es lo que el
 * componente traduce a clases.
 *
 * Solo se activa con un puntero fino: en pantallas táctiles no hay cursor
 * que reemplazar. Con las animaciones reducidas el anillo deja de retrasarse
 * en vez de desaparecer, así el cursor sigue estando.
 */
export function useCursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  const [enabled, setEnabled] = useState(false)
  const [target, setTarget] = useState<CursorTarget>('idle')
  const [pressed, setPressed] = useState(false)
  const [inWindow, setInWindow] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)')
    const sync = () => setEnabled(fine.matches)
    sync()
    fine.addEventListener('change', sync)
    return () => fine.removeEventListener('change', sync)
  }, [])

  // El puntero del sistema se apaga desde acá y no desde la hoja de estilos:
  // si este efecto no corre, tampoco hay cursor propio que lo reemplace.
  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('has-cursorTrail')
    return () => root.classList.remove('has-cursorTrail')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = reduced ? 1 : RING_EASE

    const mouse = { x: 0, y: 0 }
    const ring = { x: 0, y: 0 }
    let placed = false
    let frame = 0

    const tick = () => {
      ring.x += (mouse.x - ring.x) * ease
      ring.y += (mouse.y - ring.y) * ease

      // `translate` y no `transform`: el escalado de cada estado lo pone el
      // CSS en `transform`, y así no se pisan.
      if (dotRef.current) dotRef.current.style.translate = `${mouse.x}px ${mouse.y}px`
      if (ringRef.current) ringRef.current.style.translate = `${ring.x}px ${ring.y}px`

      frame = requestAnimationFrame(tick)
    }

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return

      mouse.x = event.clientX
      mouse.y = event.clientY

      // El primer movimiento coloca el anillo en el puntero: si no, entraría
      // volando desde la esquina.
      if (!placed) {
        ring.x = mouse.x
        ring.y = mouse.y
        placed = true
      }

      setInWindow(true)
      setTarget(targetUnder(event.target))
    }

    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => setInWindow(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('blur', onUp)
    document.addEventListener('mouseleave', onLeave)

    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('blur', onUp)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [enabled])

  // Sobre un campo de texto manda el cursor del sistema: el caret dice dónde
  // va a caer lo que se escriba, y eso no se reemplaza con un adorno.
  const visible = enabled && inWindow && target !== 'text'

  return { dotRef, ringRef, enabled, target, pressed, visible }
}
