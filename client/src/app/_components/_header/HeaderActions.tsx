"use client"
import Link from 'next/link'
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
export default function HeaderActions({ actions }: HeaderActionsProps) {
  const { lang } = useSettings()

  return (
    <>
      {actions.map((action) => (
        <Link
          key={action.id}
          href={safeHref(action.ref) ?? '#'}
          target='_blank'
          rel='noopener noreferrer'
          draggable='false'
          {...(action.load ? { download: action.load } : {})}
        >
          {translateLink(lang, action.alt, action.alt)}
        </Link>
      ))}
    </>
  )
}
