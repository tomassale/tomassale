"use client"
import { useDeck } from "../_deck/DeckContext";
import { useSettings } from "../_settings/SettingsProvider";

// Los enlaces no saben sobre qué eje se desplaza la página: le piden al
// recorrido que los lleve al panel.
export default function HeaderLinks() {
  const { panels, activeId, goTo } = useDeck()
  const { t } = useSettings()

  return (
    // Hay dos navegaciones con los mismos destinos: sin nombre propio, la
    // lista de regiones del lector de pantalla muestra dos entradas iguales.
    <nav className='barra' aria-label={t('mainNav')}>
      {panels.map((panel) => (
        // Enlaces y no botones: los paneles tienen id, así que son destinos
        // reales. Eso los pone en la lista de enlaces del lector de pantalla,
        // permite abrirlos en otra pestaña y funciona aunque falle el JS.
        <a
          key={panel.id}
          href={`#${panel.id}`}
          className={panel.id === activeId ? 'is-active' : ''}
          onClick={(event) => {
            event.preventDefault()
            goTo(panel.id)
          }}
          aria-current={panel.id === activeId ? 'true' : undefined}
        >
          {panel.label}
        </a>
      ))}
    </nav>
  );
}
