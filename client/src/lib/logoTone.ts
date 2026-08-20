/**
 * Varios logos del stack son monocromáticos: vienen en un solo tono y
 * desaparecen contra el fondo del tema opuesto. Acá se declara sobre qué
 * fondo está pensado cada uno; el CSS se encarga de darlo vuelta cuando
 * el tema no es el que el logo espera.
 */
export type LogoTone = 'onDark' | 'onLight' | 'plate'

const TONE_BY_LOGO: Record<string, LogoTone> = {
  expo: 'onDark',
  express: 'onDark',
  github: 'onDark',
  php: 'onDark',
  // El círculo de Next es negro: es el que se pierde en el tema oscuro.
  next: 'onLight',
  // El delfín de MySQL no se invierte: se lo apoya sobre su teal de marca.
  sql: 'plate',
}

/** Nombre del archivo de logo, sin carpeta ni extensión: 'front/next.svg' -> 'next'. */
function logoName(src: string): string {
  return src.split('/').pop()?.replace(/\.svg$/, '') ?? ''
}

/** Clase de ajuste para el logo de `src`, o undefined si se lee en ambos temas. */
export function logoToneClass(src: string): string | undefined {
  const tone = TONE_BY_LOGO[logoName(src)]
  return tone && `logo--${tone}`
}

/**
 * Cómo se llama la tecnología que dibuja ese logo.
 *
 * En las tarjetas de proyecto, estos íconos son el único lugar donde se dice
 * con qué está hecho cada trabajo: sin texto alternativo, esa información no
 * existe para quien no ve las imágenes.
 */
export function techName(src: string): string {
  const name = logoName(src)
  return DISPLAY_NAME[name] ?? name.charAt(0).toUpperCase() + name.slice(1)
}

/** Solo los que no se escriben capitalizando el nombre del archivo. */
const DISPLAY_NAME: Record<string, string> = {
  php: 'PHP',
  sql: 'SQL',
  node: 'Node.js',
  mongodb: 'MongoDB',
  github: 'GitHub',
  'microsoft-teams': 'Microsoft Teams',
}
