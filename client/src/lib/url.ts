// Valida el esquema de una URL antes de usarla en href/src.
// Solo permite http/https/mailto absolutas y rutas relativas del propio sitio.
// Neutraliza vectores como "javascript:" o "data:text/html" si el contenido
// del JSON llegara a ser manipulado.
export function safeHref(u?: string): string | undefined {
  if (!u) return undefined
  const value = u.trim()
  if (value.startsWith('/')) return value // asset o ruta relativa del sitio
  try {
    const { protocol } = new URL(value)
    return ['http:', 'https:', 'mailto:'].includes(protocol) ? value : undefined
  } catch {
    return undefined
  }
}
