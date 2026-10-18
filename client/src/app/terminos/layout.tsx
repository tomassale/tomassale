import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { buildPageMetadata, TITLE_TEMPLATE } from '@/lib/seo'
import { legalDocuments } from '@/lib/legal'

// La página en sí es un componente de cliente (sigue el idioma elegido), y
// desde ahí no se puede exportar metadata: por eso vive en este layout.
const TITLE = legalDocuments.es.title

export const metadata: Metadata = {
  title: TITLE,
  ...buildPageMetadata({
    path: '/terminos',
    // Open Graph no pasa por la plantilla de títulos: va armado a mano.
    title: TITLE_TEMPLATE.replace('%s', TITLE),
    description:
      'Condiciones de uso del portfolio de Tomás Javier Sale: propiedad intelectual, ' +
      'formulario de contacto, datos personales y enlaces externos.',
  }),
}

export default function TerminosLayout({ children }: { readonly children: ReactNode }) {
  return children
}
