"use client"
import { useDeck } from './DeckContext'
import { useSettings } from '../_settings/SettingsProvider'

/**
 * En un recorrido horizontal hay que decir dónde estás parado y cuánto
 * falta: la barra de scroll está oculta y no lo resuelve el navegador.
 */
export default function DeckRail() {
  const { panels, activeId, progress, goTo } = useDeck()
  const { t } = useSettings()

  return (
    <nav className='rail' aria-label={t('sectionsNav')}>
      {/* role='list' explícito: el reset global pone list-style: none en
          todo, y con eso Safari deja de anunciar la lista y su cantidad. */}
      <ol className='rail__steps' role='list'>
        {panels.map((panel, index) => (
          <li key={panel.id}>
            <a
              href={`#${panel.id}`}
              className={`rail__step${panel.id === activeId ? ' rail__step--active' : ''}`}
              onClick={(event) => {
                event.preventDefault()
                goTo(panel.id)
              }}
              aria-current={panel.id === activeId ? 'true' : undefined}
            >
              <span className='rail__index'>{String(index + 1).padStart(2, '0')}</span>
              <span className='rail__label'>{panel.label}</span>
            </a>
          </li>
        ))}
      </ol>

      <div className='rail__track' aria-hidden='true'>
        <span className='rail__progress' style={{ transform: `scaleX(${progress})` }}/>
      </div>
    </nav>
  )
}
