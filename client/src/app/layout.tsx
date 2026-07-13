import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SettingsProvider } from './_components/_settings/SettingsProvider'
import './globals.scss'

export const metadata: Metadata = {
  title: 'Tomás Sale - Software Developer',
  description: 'Personal Portfolio',
  icons: {
    icon: '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
      <SpeedInsights />
    </html>
  )
}
