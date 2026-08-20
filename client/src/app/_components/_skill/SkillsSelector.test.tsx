import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillsSelector from './SkillsSelector'

vi.mock('../_settings/SettingsProvider', () => ({
  useSettings: () => ({ lang: 'es' }),
}))

describe('SkillsSelector', () => {
  // El estado activo se marcaba solo con una clase de CSS, que no llega a
  // ninguna tecnología de asistencia: los botones se anunciaban todos iguales.
  it('expone qué categoría está activa, no solo con la clase', () => {
    render(
      <SkillsSelector
        categories={['All', 'Front-End', 'Back-End']}
        selectedCategory='Front-End'
        onSelect={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: 'Front-End' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('button', { name: 'Back-End' })).toHaveAttribute('aria-pressed', 'false')
  })
})
