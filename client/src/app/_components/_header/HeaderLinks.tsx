"use client"
import { useDeck } from "../_deck/DeckContext";

// Los enlaces no saben sobre qué eje se desplaza la página: le piden al
// recorrido que los lleve al panel.
export default function HeaderLinks() {
  const { panels, activeId, goTo } = useDeck()

  return (
    <nav className='barra'>
      {panels.map((panel) => (
        <button
          key={panel.id}
          className={panel.id === activeId ? 'is-active' : ''}
          onClick={() => goTo(panel.id)}
          aria-current={panel.id === activeId ? 'true' : undefined}
        >
          {panel.label}
        </button>
      ))}
    </nav>
  );
}
