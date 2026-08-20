"use client"
import { useSettings } from './SettingsProvider'

export default function SettingsControls() {
  const { lang, theme, toggleLang, toggleTheme, t } = useSettings()

  return (
    <>
      {/* La etiqueta de este botón siempre está en el idioma de destino:
          sin lang, el sintetizador la pronuncia con la fonética equivocada. */}
      <button
        onClick={toggleLang}
        lang={lang === 'es' ? 'en' : 'es'}
        aria-label={lang === 'es' ? t('switchToEnglish') : t('switchToSpanish')}
      >
        {lang === 'es' ? 'EN' : 'ES'}
      </button>
      <button
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? t('switchToLight') : t('switchToDark')}
      >
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </>
  )
}
