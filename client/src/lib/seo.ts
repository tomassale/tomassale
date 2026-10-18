import type { Metadata } from 'next'
import {
  JOB_TITLE,
  OG_IMAGE,
  PERSON_NAME,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILES,
} from './site'

// Plantilla de títulos: cada página declara solo su parte y la marca se
// agrega sola. La portada usa su título completo (ver HOME_TITLE).
export const TITLE_TEMPLATE = `%s - ${SITE_NAME}`
export const HOME_TITLE = `${SITE_NAME} - ${JOB_TITLE}`

interface PageSeo {
  /** Ruta absoluta dentro del sitio, por ejemplo '/terminos'. */
  readonly path: string
  /** Título tal como se lee en la pestaña y en Google, ya con la marca. */
  readonly title: string
  readonly description: string
}

/**
 * Metadata propia de una página: canonical, Open Graph y tarjeta de X.
 *
 * Next fusiona la metadata de los segmentos de forma superficial: si una
 * página declara `openGraph`, reemplaza el objeto entero del layout y se
 * pierden en silencio siteName y locale. Por eso cada página arma el suyo
 * completo con esta función en lugar de declarar solo lo que cambia.
 * Pasa lo mismo con la imagen: la del archivo opengraph-image de la raíz no
 * baja a un segmento que declara su propio openGraph, así que va explícita.
 */
export function buildPageMetadata({ path, title, description }: PageSeo): Metadata {
  return {
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}

const PERSON_ID = `${SITE_URL}/#person`
const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * Grafo JSON-LD del sitio: el WebSite le da a Google el nombre que muestra
 * sobre el resultado (en lugar del dominio pelado) y la Person dice de quién
 * es el portfolio y cuáles son sus perfiles. Los dos nodos se enlazan por
 * @id para no repetir datos.
 */
export function buildStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        alternateName: [PERSON_NAME, new URL(SITE_URL).hostname],
        inLanguage: 'es',
        publisher: { '@id': PERSON_ID },
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: PERSON_NAME,
        alternateName: SITE_NAME,
        url: `${SITE_URL}/`,
        jobTitle: JOB_TITLE,
        sameAs: SOCIAL_PROFILES,
      },
    ],
  }
}

/**
 * JSON listo para un <script type="application/ld+json">. Se escapa "<"
 * porque el navegador cierra el script ante el primer "</script>" que
 * aparezca, aunque esté dentro de un string del JSON.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}
