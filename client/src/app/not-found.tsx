"use client"
import Link from 'next/link'
import { useSettings } from './_components/_settings/SettingsProvider'
import WaveField from './_components/_shared/WaveField'

// Fuera del recorrido por paneles: acá no hay deck, así que la página se
// planta sola en la pantalla y el único camino de vuelta es el inicio.
export default function NotFound() {
  const { t } = useSettings()

  return (
    <main className='notFound'>
      <WaveField/>

      <div className='notFound__inner'>
        {/* Rima con el logo del header, que también se escribe como una etiqueta. */}
        <p className='notFound__code'>
          <span aria-hidden='true'>&lt;</span>404<span aria-hidden='true'>/&gt;</span>
        </p>
        <h1 className='notFound__title'>{t('notFoundTitle')}</h1>
        <p className='notFound__text'>{t('notFoundText')}</p>

        <Link className='boltLink boltLink--solid' href='/'>
          {t('backHome')}
        </Link>
      </div>
    </main>
  )
}
