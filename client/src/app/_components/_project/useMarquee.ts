"use client"
import { useCallback, useEffect, useRef, FocusEvent, PointerEvent, MouseEvent } from 'react'

const AUTO_SPEED_PX_PER_SECOND = 70
const RESUME_AFTER_MS = 7000
/** Arrastre mínimo para considerar que no fue un click sobre un enlace. */
const DRAG_THRESHOLD_PX = 5
/** Aire entre el borde de la franja y la tarjeta que acaba de recibir foco. */
const FOCUS_MARGIN_PX = 24

/**
 * Marquesina infinita con control manual.
 *
 * El contenido se renderiza dos veces y el desplazamiento se toma módulo
 * el ancho de una copia, así el bucle no tiene principio ni fin.
 *
 * Mueve la pista por `transform` y no por `scrollLeft`: así el gesto del
 * usuario y el avance automático escriben sobre la misma variable y no hay
 * que distinguir un scroll propio de uno ajeno.
 *
 * El arrastre y el foco pausan el avance, y se reanuda a los 7 s. Pasar el
 * puntero por encima no lo detiene: si lo hiciera, bastaría con dejar el
 * mouse apoyado sobre el carrusel para que pareciera roto.
 */
export function useMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)

  const offset = useRef(0)
  const loopWidth = useRef(0)
  const paused = useRef(false)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartOffset = useRef(0)
  const dragDistance = useRef(0)
  const resumeTimer = useRef(0)

  // El período del bucle es la distancia entre el arranque de una copia y
  // el de la siguiente: incluye el hueco entre ambas sin tener que sumarlo.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const measure = () => {
      const [first, second] = Array.from(track.children) as HTMLElement[]
      if (!first || !second) return
      loopWidth.current = second.offsetLeft - first.offsetLeft
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(track)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let frame = 0
    let previous = 0

    const tick = (now: number) => {
      const elapsed = previous ? (now - previous) / 1000 : 0
      previous = now

      // La pista se dibuja en translateX(-offset), así que sumar corre las
      // tarjetas hacia la izquierda: entran por la derecha y salen por la
      // izquierda. El módulo de abajo normaliza el offset a [0, width).
      if (!paused.current && !dragging.current) {
        offset.current += AUTO_SPEED_PX_PER_SECOND * elapsed
      }

      const width = loopWidth.current
      if (width > 0) offset.current = ((offset.current % width) + width) % width

      track.style.transform = `translate3d(${-offset.current}px, 0, 0)`
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => () => window.clearTimeout(resumeTimer.current), [])

  const scheduleResume = useCallback(() => {
    window.clearTimeout(resumeTimer.current)
    resumeTimer.current = window.setTimeout(() => {
      if (!dragging.current) paused.current = false
    }, RESUME_AFTER_MS)
  }, [])

  const onPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    dragging.current = true
    paused.current = true
    dragDistance.current = 0
    dragStartX.current = event.clientX
    dragStartOffset.current = offset.current
    window.clearTimeout(resumeTimer.current)
  }, [])

  const onPointerMove = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return

    const travelled = event.clientX - dragStartX.current
    dragDistance.current = Math.abs(travelled)
    offset.current = dragStartOffset.current - travelled

    // La captura se pide recién al superar el umbral, no en el pointerdown:
    // mientras hay captura el navegador dirige el click a la pista y no al
    // enlace que está debajo, así que capturar antes rompería los links.
    if (dragDistance.current > DRAG_THRESHOLD_PX && !event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }, [])

  const endDrag = useCallback(() => {
    if (!dragging.current) return
    dragging.current = false
    scheduleResume()
  }, [scheduleResume])

  // Tabular hasta una tarjeta la pausa y la trae a la vista. Sin esto el
  // foco queda puesto sobre algo que se sigue moviendo hasta salir de la
  // franja: el recuadro de foco desaparece de pantalla sin que la persona
  // haya hecho nada.
  const onFocusCapture = useCallback((event: FocusEvent<HTMLDivElement>) => {
    paused.current = true
    window.clearTimeout(resumeTimer.current)

    const card = event.target.closest('li')
    if (!card) return

    // La pista se mueve por transform, así que el navegador no puede
    // desplazarla él solo para revelar lo enfocado: hay que correrla a mano.
    const cardBox = card.getBoundingClientRect()
    const viewBox = event.currentTarget.getBoundingClientRect()
    const hidden = cardBox.left < viewBox.left || cardBox.right > viewBox.right
    if (hidden) offset.current += cardBox.left - viewBox.left - FOCUS_MARGIN_PX
  }, [])

  const onBlurCapture = useCallback((event: FocusEvent<HTMLDivElement>) => {
    // Moverse entre dos enlaces de la misma franja no es haberla dejado.
    if (event.currentTarget.contains(event.relatedTarget)) return
    scheduleResume()
  }, [scheduleResume])

  // Un arrastre que termina sobre un enlace no debe abrirlo.
  const onClickCapture = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (dragDistance.current <= DRAG_THRESHOLD_PX) return
    event.preventDefault()
    event.stopPropagation()
  }, [])

  return {
    trackRef,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: endDrag,
      onPointerCancel: endDrag,
      onClickCapture,
      onFocusCapture,
      onBlurCapture,
    },
  }
}
