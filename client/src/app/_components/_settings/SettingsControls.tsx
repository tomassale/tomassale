"use client"
import { useSettings } from './SettingsProvider'

export default function SettingsControls() {
  const { lang, theme, toggleLang, toggleTheme, t } = useSettings()

  return (
    <>
      <button
        onClick={toggleLang}
        title={lang === 'es' ? t('switchToEnglish') : t('switchToSpanish')}
        aria-label={lang === 'es' ? t('switchToEnglish') : t('switchToSpanish')}
      >
        {lang === 'es' ? 'EN' : 'ES'}
      </button>
      <button
        onClick={toggleTheme}
        title={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
        aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </>
  )
}
