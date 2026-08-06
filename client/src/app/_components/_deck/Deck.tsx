"use client"
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DeckContext, DeckPanel, useDeck } from './DeckContext'

// Por debajo de este ancho el recorrido vuelve a ser vertical.
const HORIZONTAL_QUERY = '(min-width: 900px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

interface DeckProviderProps {
  readonly panels: DeckPanel[]
  readonly children: ReactNode
}

/**
 * El recorrido horizontal vive acá: es el único que conoce el scroller.
 * La barra de navegación y el riel solo piden "llevame a este panel" y
 * "¿en cuál estoy?", sin saber sobre qué eje se desplaza la página.
 */
export function DeckProvider({ panels, children }: DeckProviderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeId, setActiveId] = useState(panels[0]?.id ?? '')
  const [progress, setProgress] = useState(0)

  const goTo = useCallback((id: string) => {
    const target = document.getElementById(id)
    if (!target) return

    const isHorizontal = window.matchMedia(HORIZONTAL_QUERY).matches
    const reducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches

    target.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
      inline: isHorizontal ? 'start' : 'nearest',
      block: isHorizontal ? 'nearest' : 'start',
    })
  }, [])

  // El panel activo es el que tiene su centro más cerca del centro de la
  // pantalla. Sirve para los dos ejes y tolera paneles de distinto ancho.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    let frame = 0

    const measure = () => {
      frame = 0
      const isHorizontal = window.matchMedia(HORIZONTAL_QUERY).matches
      const viewportCenter = (isHorizontal ? window.innerWidth : window.innerHeight) / 2

      let closestId = ''
      let closestDistance = Number.POSITIVE_INFINITY

      for (const panel of panels) {
        const rect = document.getElementById(panel.id)?.getBoundingClientRect()
        if (!rect) continue
        const center = isHorizontal ? rect.left + rect.width / 2 : rect.top + rect.height / 2
        const distance = Math.abs(center - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closestId = panel.id
        }
      }

      if (closestId) setActiveId(closestId)

      const travelled = isHorizontal ? scroller.scrollLeft : window.scrollY
      const total = isHorizontal
        ? scroller.scrollWidth - scroller.clientWidth
        : document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? Math.min(travelled / total, 1) : 0)
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    scroller.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      scroller.removeEventListener('scroll', schedule)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [panels])

  // Un contenedor horizontal no responde a la rueda vertical del mouse.
  // Traducimos deltaY a scrollLeft; el gesto horizontal del trackpad y el
  // swipe táctil siguen funcionando solos.
  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const onWheel = (event: WheelEvent) => {
      if (!window.matchMedia(HORIZONTAL_QUERY).matches) return
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return

      event.preventDefault()
      scroller.scrollLeft += event.deltaY
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })
    return () => scroller.removeEventListener('wheel', onWheel)
  }, [])

  const value = useMemo(
    () => ({ panels, scrollerRef, activeId, progress, goTo }),
    [panels, activeId, progress, goTo]
  )

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>
}

export function DeckViewport({ children }: { readonly children: ReactNode }) {
  const { scrollerRef } = useDeck()

  return (
    <div className='deck' ref={scrollerRef}>
      {children}
    </div>
  )
}
