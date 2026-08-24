"use client"
import Link from 'next/link'
import { useSettings } from '../_components/_settings/SettingsProvider'
import { legalDocuments, LEGAL_UPDATED } from '@/lib/legal'

const LOCALES = { es: 'es-AR', en: 'en-GB' } as const

// La fecha llega como 'YYYY-MM-DD', que el constructor interpreta a medianoche
// UTC: sin fijar la zona, en Argentina se mostraría el día anterior.
function formatUpdated(locale: string) {
  return new Date(LEGAL_UPDATED).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export default function TerminosPage() {
  const { lang, t } = useSettings()
  const doc = legalDocuments[lang]

  return (
    <main className='legal'>
      <div className='legal__inner'>
        <Link className='legal__back' href='/'>
          <span aria-hidden='true'>←</span> {t('backHome')}
        </Link>

        <h1 className='legal__title'>{doc.title}</h1>
        <p className='legal__updated'>
          {doc.updatedLabel}: {formatUpdated(LOCALES[lang])}
        </p>
        <p className='legal__intro'>{doc.intro}</p>

        {doc.sections.map((section) => (
          <section className='legal__section' key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </main>
  )
}
