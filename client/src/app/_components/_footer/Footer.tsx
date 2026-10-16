"use client"
import Link from "next/link"
import { useSettings } from '../_settings/SettingsProvider'

export default function Footer () {
  const { t } = useSettings()

  return(
    // Dos tramos: en una fila van unidos por el separador; en mobile cada uno
    // toma su línea y el separador sobra.
    <footer className='credit'>
      <span className='credit__line'>© {new Date().getFullYear()} Tomás Javier Sale</span>
      <span className='credit__separator'> · </span>
      <span className='credit__line'>
        Powered by{' '}
        <Link href='https://bytek-technology.vercel.app' draggable='false' target='_blank' rel='noopener noreferrer'>
          Bytek Technology
        </Link>
        {' · '}
        <Link href='/terminos' draggable='false'>{t('terms')}</Link>
      </span>
    </footer>
  )
}
