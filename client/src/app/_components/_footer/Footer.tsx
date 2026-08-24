"use client"
import Link from "next/link"
import { useSettings } from '../_settings/SettingsProvider'

export default function Footer () {
  const { t } = useSettings()

  return(
    <footer className='credit'>
      © {new Date().getFullYear()} Tomás Javier Sale · Powered by{' '}
      <Link href='https://bytek-technology.vercel.app' draggable='false' target='_blank' rel='noopener noreferrer'>
        Bytek Technology
      </Link>
      {' · '}
      <Link href='/terminos' draggable='false'>{t('terms')}</Link>
    </footer>
  )
}
