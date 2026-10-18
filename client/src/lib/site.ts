import { translations } from './i18n'
import headerData from '../../public/data/header.json'

// Identidad del sitio en un solo lugar: canonical, sitemap, robots, Open
// Graph y JSON-LD salen de acá. Si cambia el dominio, cambia solo esta línea.
//
// Es el apex, sin www: es la versión que Google tiene indexada. Cualquier
// otra variante (www, *.vercel.app) tiene que redirigir acá, no competir.
export const SITE_URL = 'https://tomasssale.com'

export const SITE_NAME = 'Tomás Sale'
export const PERSON_NAME = 'Tomás Javier Sale'

// El HTML sale del servidor en español; el inglés lo elige el visitante en
// el navegador sobre la misma URL, así que no hay variantes que declarar.
export const SITE_LOCALE = 'es_AR'

// Mismo texto que el rol del hero: lo que se lee en el resultado de búsqueda
// coincide con lo que se ve al entrar.
export const JOB_TITLE = translations.es.webDeveloper

export const SITE_DESCRIPTION =
  'Tomás Javier Sale, desarrollador web en Argentina. Sitios y aplicaciones ' +
  'con Next.js, Angular, Node.js y Express: proyectos, habilidades y contacto directo.'

// La tarjeta para compartir la dibuja app/opengraph-image.tsx; acá viven sus
// datos para que las páginas que arman su propio Open Graph la referencien.
export const OG_IMAGE = {
  url: '/opengraph-image',
  width: 1200,
  height: 630,
  alt: `${PERSON_NAME} - ${JOB_TITLE}`,
} as const

// Los perfiles son los mismos que enlaza la barra superior; el CV es una
// ruta propia y no un perfil, por eso queda afuera.
export const SOCIAL_PROFILES: readonly string[] = headerData.icons
  .map((icon) => icon.ref)
  .filter((ref) => ref.startsWith('https://'))
  // new URL codifica la "á" del perfil de LinkedIn: sameAs pide una URL válida.
  .map((ref) => new URL(ref).href)
