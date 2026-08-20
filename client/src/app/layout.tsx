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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <SettingsProvider>
          {children}
          <CursorTrail />
        </SettingsProvider>
      </body>
      <SpeedInsights />
    </html>
  )
}
