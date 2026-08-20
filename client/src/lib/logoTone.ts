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

/** Clase de ajuste para el logo de `src`, o undefined si se lee en ambos temas. */
export function logoToneClass(src: string): string | undefined {
  const name = src.split('/').pop()?.replace(/\.svg$/, '')
  const tone = name ? TONE_BY_LOGO[name] : undefined
  return tone && `logo--${tone}`
}
