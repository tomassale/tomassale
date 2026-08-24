"use client"
import { useSettings } from '../_settings/SettingsProvider'
import { translateLink } from '@/lib/i18n'
import { safeHref } from '@/lib/url'

export interface HeaderAction {
  id: number;
  ref: string;
  load?: string;
  alt: string;
}

interface HeaderActionsProps {
  readonly actions: HeaderAction[]
}

// Enlaces externos en texto: la barra no lleva iconografía.
//
// Van con `<a>` y no con `next/link` a propósito. Ninguno lleva a una página
// de la app —dos son sitios de afuera y el tercero es el CV— y el router
// precargaba ese PDF entero al entrar en pantalla: 58 KB en cada visita, para
// un archivo que casi nadie abre.
export default function HeaderActions({ actions }: HeaderActionsProps) {
  const { lang } = useSettings()

  return (
    <>
      {actions.map((action) => (
        <a
          key={action.id}
          href={safeHref(action.ref) ?? '#'}
          target='_blank'
          rel='noopener noreferrer'
          draggable='false'
          {...(action.load ? { download: action.load } : {})}
        >
          {translateLink(lang, action.alt, action.alt)}
        </a>
      ))}
    </>
  )
}
