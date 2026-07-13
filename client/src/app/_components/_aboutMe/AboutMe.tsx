"use client"
import { useSettings } from '../_settings/SettingsProvider'

export default function AboutMe () {
  const { t } = useSettings()
  const xp = new Date().getFullYear() - 2023
  return (
    <div className='aboutMe' id='aboutMe'>
      <h2>Tomás Javier Sale</h2>
      <h4>{t('webDeveloper')}</h4>
      <p className="description">
        {t('description').replace('{xp}', String(xp))}
      </p>
    </div>
  )
}
