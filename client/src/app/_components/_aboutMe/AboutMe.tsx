"use client"
import { useSettings } from '../_settings/SettingsProvider'
import { useDeck } from '../_deck/DeckContext'
import WaveField from '../_shared/WaveField'

const CAREER_START_YEAR = 2023

export default function AboutMe () {
  const { t } = useSettings()
  const { panels, goTo } = useDeck()
  const xp = new Date().getFullYear() - CAREER_START_YEAR
  const nextPanel = panels[1]

  return (
    <section className='panel panel--hero' id='aboutMe'>
      <WaveField/>

      <div className='panel__inner hero'>
        <h1 className='hero__name'>
          Tomás Javier <span>Sale</span>
        </h1>
        <p className='hero__role'>{t('webDeveloper')}</p>
        <p className='hero__description'>
          {t('description').replace('{xp}', String(xp))}
        </p>

        {nextPanel && (
          <button className='hero__cue' onClick={() => goTo(nextPanel.id)}>
            {t('scrollCue')}
            <span aria-hidden='true'>→</span>
          </button>
        )}
      </div>
    </section>
  )
}
