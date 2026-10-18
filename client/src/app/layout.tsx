import type { Metadata } from 'next'
import { Sora, Manrope } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SettingsProvider } from './_components/_settings/SettingsProvider'
import CursorTrail from './_components/_shared/CursorTrail'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, PERSON_NAME } from '@/lib/site'
import {
  buildPageMetadata,
  buildStructuredData,
  serializeJsonLd,
  HOME_TITLE,
  TITLE_TEMPLATE,
} from '@/lib/seo'
import './globals.scss'

const display = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
})

const body = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})

// Lo monoespaciado son los números del riel y el contador del formulario: una
// docena de glifos. JetBrains Mono costaba 41 KB precargados compitiendo con
// el LCP por eso, así que ahora sale del sistema (--font-mono en globals.scss).

// Los iconos salen de los archivos favicon.ico / icon.svg / icon.png /
// apple-icon.png de este mismo directorio, y la imagen para compartir de
// opengraph-image.tsx: declararlos acá a mano tapa esos links.
//
// Lo de abajo es la metadata de la portada; las demás páginas pisan
// canonical y Open Graph con buildPageMetadata en su propio layout.
export const metadata: Metadata = {
  // Base de las URL relativas (canonical, og:url, og:image): sin esto Next
  // las resolvería contra el host de cada despliegue de preview.
  metadataBase: new URL(SITE_URL),
  title: { default: HOME_TITLE, template: TITLE_TEMPLATE },
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: SITE_URL }],
  ...buildPageMetadata({ path: '/', title: HOME_TITLE, description: SITE_DESCRIPTION }),
}

// Va en todas las páginas porque describe al sitio entero, no a una página.
// Google exige que el WebSite esté en la portada; repetirlo no molesta.
const STRUCTURED_DATA = serializeJsonLd(buildStructuredData())

// Corre antes del primer pintado: deja el idioma y el tema guardados puestos
// en el <html> sin esperar a que hidrate React. Sin esto, el documento sale
// del servidor declarando un idioma que puede no ser el del contenido —el
// lector de pantalla lo lee con la fonética equivocada— y quien eligió tema
// claro ve un destello oscuro. Solo lee localStorage y solo acepta dos
// valores conocidos: no hay dato de afuera que pueda entrar acá.
const RESTORE_PREFERENCES = `
try {
  var root = document.documentElement
  var lang = localStorage.getItem('lang')
  if (lang === 'es' || lang === 'en') root.lang = lang
  var theme = localStorage.getItem('theme')
  if (theme === 'dark' || theme === 'light') root.dataset.theme = theme
} catch (e) {}
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='es'
      data-theme='dark'
      className={`${display.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_PREFERENCES }} />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
        />
        <SettingsProvider>
          {children}
          <CursorTrail />
        </SettingsProvider>
      </body>
      <SpeedInsights />
    </html>
  )
}
