"use client"
import { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react'
import { translations, Lang, TranslationKey } from '@/lib/i18n'

type Theme = 'dark' | 'light'

interface SettingsContextValue {
  lang: Lang
  theme: Theme
  toggleLang: () => void
  toggleTheme: () => void
  t: (key: TranslationKey) => string
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export function SettingsProvider({ children }: { readonly children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('es')
  const [theme, setTheme] = useState<Theme>('dark')

  // Recuperar preferencias guardadas al montar (evita mismatch de hidratación:
  // el primer render usa siempre los defaults y recién después se ajusta).
  useEffect(() => {
    const savedLang = localStorage.getItem('lang')
    const savedTheme = localStorage.getItem('theme')
    if (savedLang === 'es' || savedLang === 'en') setLang(savedLang)
    if (savedTheme === 'dark' || savedTheme === 'light') setTheme(savedTheme)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang)
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggleLang = useCallback(() => setLang((prev) => (prev === 'es' ? 'en' : 'es')), [])
  const toggleTheme = useCallback(() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')), [])
  const t = useCallback((key: TranslationKey) => translations[lang][key], [lang])

  const value = useMemo(
    () => ({ lang, theme, toggleLang, toggleTheme, t }),
    [lang, theme, toggleLang, toggleTheme, t]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings debe usarse dentro de SettingsProvider')
  return ctx
}
