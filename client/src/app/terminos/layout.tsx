import type { Metadata } from 'next'
import type { ReactNode } from 'react'

// La página en sí es un componente de cliente (sigue el idioma elegido), y
// desde ahí no se puede exportar metadata: por eso vive en este layout.
export const metadata: Metadata = {
  title: 'Términos y condiciones - Tomás Sale',
  description:
    'Condiciones de uso del portfolio de Tomás Javier Sale: propiedad intelectual, ' +
    'formulario de contacto, datos personales y enlaces externos.',
}

export default function TerminosLayout({ children }: { readonly children: ReactNode }) {
  return children
}
