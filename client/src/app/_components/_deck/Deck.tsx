"use client"
import { CSSProperties, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DeckContext, DeckPanel, useDeck } from './DeckContext'

// Por debajo de este ancho el recorrido vuelve a ser vertical.
const HORIZONTAL_QUERY = '(min-width: 900px)'
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
// Un gesto de rueda son muchos eventos seguidos: el umbral descarta el
// temblor del trackpad y el descanso evita que un empujón salte tres paneles.
const WHEEL_THRESHOLD = 16
const STEP_COOLDOWN_MS = 600

// `matchMedia` parsea la consulta y devuelve un objeto nuevo cada vez, y acá
// se pregunta por evento de rueda —un trackpad manda más de cien por segundo—.
// La lista se crea una sola vez: es un objeto vivo, así que `matches` sigue
// estando al día cuando cambia el tamaño de la ventana.
const mediaLists = new Map<string, MediaQueryList>()

function mediaMatches(query: string) {
  if (typeof window === 'undefined') return false

  let list = mediaLists.get(query)
  if (!list) {
    list = window.matchMedia(query)
    mediaLists.set(query, list)
  }

  return list.matches
}

interface DeckProviderProps {
  readonly panels: DeckPanel[]
  readonly children: ReactNode
}

/**
 * El recorrido vive acá: es el único que sabe cómo se pasa de panel.
 *
 * En horizontal no hay scroll —la pantalla entera es un panel y la fila se
 * corre con transform—, así que el índice es la única verdad. En vertical
 * (mobile) manda el scroll de la ventana y el índice lo sigue.
 *
 * La barra de navegación y el riel solo piden "llevame a este panel" y
 * "¿en cuál estoy?", sin saber cuál de los dos modos está en juego.
 */
export function DeckProvider({ panels, children }: DeckProviderProps) {
  const viewportRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const index = clampIndex(activeIndex, panels.length)

  const step = useCallback((direction: number) => {
    setActiveIndex((current) => clampIndex(current + direction, panels.length))
  }, [panels.length])

  const goTo = useCallback((id: string) => {
    const target = document.getElementById(id)
    const targetIndex = panels.findIndex((panel) => panel.id === id)
    if (!target || targetIndex < 0) return

    if (mediaMatches(HORIZONTAL_QUERY)) {
      setActiveIndex(targetIndex)
    } else {
      target.scrollIntoView({
        behavior: mediaMatches(REDUCED_MOTION_QUERY) ? 'auto' : 'smooth',
        block: 'start',
      })
    }

    // Cambiar de panel no mueve el foco: sin esto, quien navega por teclado
    // llega al panel pero su próximo Tab sigue en la barra, no en el
    // contenido que acaba de pedir. El panel no está en el recorrido
    // (tabindex -1): solo puede recibir el foco de esta forma.
    target.setAttribute('tabindex', '-1')
    target.focus({ preventScroll: true })
  }, [panels])

  // En vertical el scroll de la ventana es el que manda: el índice lo sigue
  // para que la barra marque dónde está parado el que baja. El panel activo
  // es el que tiene su centro más cerca del centro de la pantalla.
  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      if (mediaMatches(HORIZONTAL_QUERY)) return

      const viewportCenter = window.innerHeight / 2
      let closest = 0
      let closestDistance = Number.POSITIVE_INFINITY

      panels.forEach((panel, panelIndex) => {
        const rect = document.getElementById(panel.id)?.getBoundingClientRect()
        if (!rect) return
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter)
        if (distance < closestDistance) {
          closestDistance = distance
          closest = panelIndex
        }
      })

      setActiveIndex(closest)
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [panels])

  // En horizontal ya no hay scroll que llevar el recorrido: la rueda y las
  // flechas son las que dan el paso, o el mouse y el teclado se quedan sin
  // forma de avanzar que no sea la barra.
  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    let lastStepAt = 0

    const takeStep = (direction: number, at: number) => {
      if (at - lastStepAt < STEP_COOLDOWN_MS) return
      lastStepAt = at
      step(direction)
    }

    const onWheel = (event: WheelEvent) => {
      if (!mediaMatches(HORIZONTAL_QUERY)) return

      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX
      if (canScrollVertically(event.target, delta, viewport)) return

      event.preventDefault()
      if (Math.abs(delta) < WHEEL_THRESHOLD) return
      takeStep(Math.sign(delta), event.timeStamp)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (!mediaMatches(HORIZONTAL_QUERY)) return
      if (event.ctrlKey || event.metaKey || event.altKey) return
      // Dentro de un campo las flechas mueven el cursor de texto, no el recorrido.
      if (event.target instanceof HTMLElement && event.target.closest('input, textarea, select')) return

      const direction = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
      if (!direction) return

      event.preventDefault()
      takeStep(direction, event.timeStamp)
    }

    viewport.addEventListener('wheel', onWheel, { passive: false })
    viewport.addEventListener('keydown', onKeyDown)

    return () => {
      viewport.removeEventListener('wheel', onWheel)
      viewport.removeEventListener('keydown', onKeyDown)
    }
  }, [step])

  const value = useMemo(
    () => ({
      panels,
      viewportRef,
      activeIndex: index,
      activeId: panels[index]?.id ?? '',
      progress: panels.length > 1 ? index / (panels.length - 1) : 0,
      goTo,
    }),
    [panels, index, goTo]
  )

  return <DeckContext.Provider value={value}>{children}</DeckContext.Provider>
}

export function DeckViewport({ children }: { readonly children: ReactNode }) {
  const { viewportRef, activeIndex } = useDeck()

  return (
    <main
      className='deck'
      id='main'
      ref={viewportRef}
      tabIndex={-1}
      // Cuánto vale un paso lo sabe el CSS: acá solo se dice en cuál estamos,
      // y así el modo vertical puede ignorar la variable sin más.
      style={{ '--deck-step': activeIndex } as CSSProperties}
    >
      {children}
    </main>
  )
}

// El paso no puede salirse del recorrido: acá terminan la rueda, las flechas
// y los enlaces, y de acá sale siempre un panel que existe.
function clampIndex(value: number, length: number) {
  if (length < 1) return 0
  return Math.min(Math.max(value, 0), length - 1)
}

/**
 * ¿Hay algo entre el puntero y el recorrido que todavía pueda desplazarse
 * hacia donde apunta la rueda?
 *
 * Los paneles ya no se desplazan, pero adentro quedan dos que sí: el mensaje
 * del formulario y la descripción de las tarjetas. Robarles el evento deja su
 * texto inalcanzable, porque su barra tampoco está a la vista.
 */
function canScrollVertically(from: EventTarget | null, deltaY: number, limit: HTMLElement) {
  let node = from instanceof HTMLElement ? from : null

  while (node && node !== limit) {
    const overflows = node.scrollHeight > node.clientHeight
    const room = deltaY > 0
      ? Math.ceil(node.scrollTop + node.clientHeight) < node.scrollHeight
      : node.scrollTop > 0

    if (overflows && room && getComputedStyle(node).overflowY !== 'visible') return true
    node = node.parentElement
  }

  return false
}
