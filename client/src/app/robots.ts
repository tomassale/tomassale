import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

// Todo el sitio es público salvo la API del formulario, que solo responde a
// POST: rastrearla gasta visitas del bot en una URL que no tiene contenido.
// No se bloquea nada de /_next ni de /img: Google necesita el CSS, el JS y
// las imágenes para ver la página como la ve el visitante.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
