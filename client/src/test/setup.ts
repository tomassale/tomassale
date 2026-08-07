import '@testing-library/jest-dom/vitest'
import { afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import React from 'react'

// Node 22+ define un `localStorage` global propio (Web Storage API, detrás de
// --localstorage-file) que en el entorno jsdom de Vitest termina ganándole al
// de jsdom: window === globalThis acá, y Vitest no pisa una clave que Node ya
// trae nativa, así que `localStorage.getItem(...)` explota con
// "Cannot read properties of undefined". Lo reemplazamos por un Storage
// mínimo en memoria: es todo lo que SettingsProvider necesita.
class MemoryStorage implements Storage {
  private readonly store = new Map<string, string>()

  get length() {
    return this.store.size
  }

  clear() {
    this.store.clear()
  }

  getItem(key: string) {
    return this.store.has(key) ? this.store.get(key)! : null
  }

  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null
  }

  removeItem(key: string) {
    this.store.delete(key)
  }

  setItem(key: string, value: string) {
    this.store.set(key, String(value))
  }
}

if (typeof window !== 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: new MemoryStorage() })
  Object.defineProperty(globalThis, 'sessionStorage', { configurable: true, value: new MemoryStorage() })
}

afterEach(() => {
  cleanup()
  if (typeof window !== 'undefined') {
    localStorage.clear()
    sessionStorage.clear()
  }
})

// jsdom no implementa ResizeObserver; useMarquee lo usa para medir el track
// de la marquesina. No-op alcanza: los tests que necesitan el ancho lo fuerzan
// a mano vía Object.defineProperty(offsetLeft).
if (typeof globalThis.ResizeObserver === 'undefined') {
  class ResizeObserverStub {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  globalThis.ResizeObserver = ResizeObserverStub
}

// next/image exige el pipeline de optimización de Next, que no corre en
// tests. Lo reemplazamos por un <img> plano que conserva los props visibles
// y descarta los que son exclusivos de next/image (no válidos en un <img>).
const NEXT_IMAGE_ONLY_PROPS = ['fill', 'sizes', 'priority']

vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    const rest = { ...props }
    for (const key of NEXT_IMAGE_ONLY_PROPS) delete rest[key]
    return React.createElement('img', rest)
  },
}))
