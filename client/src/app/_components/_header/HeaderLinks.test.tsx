import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HeaderLinks from './HeaderLinks'
import { DeckContext, DeckContextValue } from '../_deck/DeckContext'

function renderWithDeck(overrides: Partial<DeckContextValue> = {}) {
  const goTo = vi.fn()
  const value: DeckContextValue = {
    panels: [
      { id: 'aboutMe', label: 'ABOUT ME' },
      { id: 'skill', label: 'SKILLS' },
      { id: 'portfolio', label: 'PORTFOLIO' },
    ],
    scrollerRef: createRef<HTMLDivElement>(),
    activeId: 'skill',
    progress: 0.5,
    goTo,
    ...overrides,
  }

  render(
    <DeckContext.Provider value={value}>
      <HeaderLinks />
    </DeckContext.Provider>
  )

  return { goTo, value }
}

describe('HeaderLinks', () => {
  it('marca aria-current en el panel activo', () => {
    renderWithDeck()

    expect(screen.getByRole('button', { name: 'SKILLS' })).toHaveAttribute('aria-current', 'true')
    expect(screen.getByRole('button', { name: 'ABOUT ME' })).not.toHaveAttribute('aria-current')
    expect(screen.getByRole('button', { name: 'PORTFOLIO' })).not.toHaveAttribute('aria-current')
  })

  it('llama a goTo con el id del panel correcto al hacer click', async () => {
    const user = userEvent.setup()
    const { goTo } = renderWithDeck()

    await user.click(screen.getByRole('button', { name: 'PORTFOLIO' }))

    expect(goTo).toHaveBeenCalledTimes(1)
    expect(goTo).toHaveBeenCalledWith('portfolio')
  })
})
