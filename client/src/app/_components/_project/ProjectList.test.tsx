import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectList from './ProjectList'
import type { ProjectData } from './ProjectCard'

vi.mock('../_settings/SettingsProvider', () => ({
  useSettings: () => ({ t: (key: string) => key, lang: 'es' }),
}))

const cards: ProjectData[] = [
  { _id: '1', img: '/a.png', title: 'Proyecto A', icons: {}, github: 'https://github.com/a' },
  { _id: '2', img: '/b.png', title: 'Proyecto B', icons: {}, github: 'https://github.com/b' },
]

describe('ProjectList', () => {
  it('muestra el estado de carga cuando no hay tarjetas', () => {
    render(<ProjectList cards={[]} />)
    expect(screen.getByText('loadingProjects')).toBeInTheDocument()
  })

  it('renderiza el set de tarjetas dos veces para cerrar el bucle de la marquesina', () => {
    render(<ProjectList cards={cards} />)

    // Título visible dos veces: original + copia que cierra el loop.
    expect(screen.getAllByText('Proyecto A')).toHaveLength(2)
    expect(screen.getAllByText('Proyecto B')).toHaveLength(2)
  })

  it('la copia duplicada no se anuncia (aria-hidden) ni se tabula (tabIndex=-1)', () => {
    render(<ProjectList cards={cards} />)

    // Sin `hidden: true`, testing-library respeta aria-hidden: solo aparecen
    // los links "reales", uno por tarjeta.
    const accessibleLinks = screen.getAllByRole('link', { name: 'GitHub' })
    expect(accessibleLinks).toHaveLength(cards.length)
    accessibleLinks.forEach((link) => expect(link).not.toHaveAttribute('tabindex'))

    // Con `hidden: true` aparecen también las copias del loop.
    const allLinks = screen.getAllByRole('link', { name: 'GitHub', hidden: true })
    expect(allLinks).toHaveLength(cards.length * 2)

    const duplicateLinks = allLinks.filter((link) => !accessibleLinks.includes(link))
    duplicateLinks.forEach((link) => {
      expect(link).toHaveAttribute('tabindex', '-1')
      expect(link.closest('[aria-hidden="true"]')).not.toBeNull()
    })
  })
})
