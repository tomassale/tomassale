import type { Metadata } from 'next'
import { Sora, Manrope, JetBrains_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SettingsProvider } from './_components/_settings/SettingsProvider'
import CursorTrail from './_components/_shared/CursorTrail'
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

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

// Los iconos salen de los archivos icon.svg / favicon.ico / apple-icon.png
// de este mismo directorio: declararlos acá a mano tapa esos links.
export const metadata: Metadata = {
  title: 'Tomás Sale - Software Developer',
  description: 'Portfolio de Tomás Javier Sale, desarrollador web full stack.',
}

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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_PREFERENCES }} />
        <SettingsProvider>
          {children}
          <CursorTrail />
        </SettingsProvider>
      </body>
      <SpeedInsights />
    </html>
  )
}
