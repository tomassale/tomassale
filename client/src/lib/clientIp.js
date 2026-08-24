// De quién es la petición, para contarla en el rate limit.
//
// `x-forwarded-for` es una lista que va creciendo: cada proxy agrega el salto
// anterior a la derecha. El valor de más a la izquierda lo escribe quien llama
// —o sea, quien quiera inventarlo—, así que tomarlo convierte el límite por IP
// en un adorno: basta con rotar el encabezado para volver a empezar de cero.
//
// Los dos primeros encabezados de acá los pone Vercel en el edge y pisa lo que
// haya mandado el cliente; son los únicos confiables. Si no están (desarrollo,
// o un hosteo distinto), se cae al último salto de la lista, que es el que
// agregó el proxy más cercano, nunca el que eligió el cliente.
const TRUSTED_HEADERS = ['x-vercel-forwarded-for', 'x-real-ip'];

const UNKNOWN = 'unknown';

/** El salto más cercano al servidor: el último de la lista, no el primero. */
function lastHop(value) {
  const hops = value
    .split(',')
    .map((hop) => hop.trim())
    .filter(Boolean);

  return hops.at(-1);
}

export function clientIp(headers) {
  for (const name of TRUSTED_HEADERS) {
    const value = headers.get(name);
    const hop = value ? lastHop(value) : undefined;
    if (hop) return hop;
  }

  const forwarded = headers.get('x-forwarded-for');
  return (forwarded ? lastHop(forwarded) : undefined) ?? UNKNOWN;
}
