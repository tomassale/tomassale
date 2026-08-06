"use client"
import { createContext, useContext, RefObject } from 'react'

export interface DeckPanel {
  id: string
  label: string
}

export interface DeckContextValue {
  panels: DeckPanel[]
  /** Contenedor que se desplaza; lo monta DeckViewport. */
  scrollerRef: RefObject<HTMLDivElement | null>
  /** Id del panel que ocupa el centro de la pantalla. */
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
