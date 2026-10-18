import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'
import { LEGAL_UPDATED } from '@/lib/legal'

// Solo las páginas indexables, con la misma URL que declaran como canonical.
// La portada no lleva fecha: no hay una fuente confiable de cuándo cambió, y
// poner la del build le diría a Google que cambia en cada despliegue.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/terminos`, lastModified: LEGAL_UPDATED },
  ]
}
