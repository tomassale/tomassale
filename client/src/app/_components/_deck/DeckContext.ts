"use client"
import { createContext, useContext, RefObject } from 'react'

export interface DeckPanel {
  id: string
  label: string
}

export interface DeckContextValue {
  panels: DeckPanel[]
  /** Contenedor del recorrido; lo monta DeckViewport. */
  viewportRef: RefObject<HTMLElement | null>
  /** Posición del panel a la vista dentro del recorrido. */
  activeIndex: number
  /** Id del panel a la vista. */
  activeId: string
  /** Avance del recorrido, de 0 a 1. */
  progress: number
  goTo: (id: string) => void
}

export const DeckContext = createContext<DeckContextValue | null>(null)

export function useDeck() {
  const ctx = useContext(DeckContext)
  if (!ctx) throw new Error('useDeck debe usarse dentro de DeckProvider')
  return ctx
}
