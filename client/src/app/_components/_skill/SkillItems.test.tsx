import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import SkillItems from './SkillItems'
import { ALL_CATEGORIES } from './SkillList'

const items = [
  { id: 1, tech: 'React', src: '/img/react.svg', alt: 'React', category: 'Front-End' },
  { id: 2, tech: 'Node', src: '/img/node.svg', alt: 'Node', category: 'Back-End' },
  { id: 3, tech: 'SCSS', src: '/img/scss.svg', alt: 'SCSS', category: 'Front-End' },
]

describe('SkillItems', () => {
  it('renderiza un chip por cada item, sin atenuar, cuando no hay filtro', () => {
    render(<SkillItems items={items} selectedCategory={ALL_CATEGORIES} />)

    const chips = screen.getAllByText(/React|Node|SCSS/)
    expect(chips).toHaveLength(3)
    chips.forEach((chip) => expect(chip).not.toHaveClass('skillChip--dim'))
  })

  it('al filtrar, atenúa los chips fuera de categoría en vez de desmontarlos', () => {
    render(<SkillItems items={items} selectedCategory='Front-End' />)

    // Los tres chips siguen en el DOM: filtrar no reduce el conteo.
    expect(screen.getAllByText(/React|Node|SCSS/)).toHaveLength(3)

    expect(screen.getByText('React')).not.toHaveClass('skillChip--dim')
    expect(screen.getByText('SCSS')).not.toHaveClass('skillChip--dim')
    expect(screen.getByText('Node')).toHaveClass('skillChip--dim')
  })
})
