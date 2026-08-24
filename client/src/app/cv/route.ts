import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { logger } from '@/lib/logger'

// Se resuelve una sola vez, al construir el sitio, y se sirve como archivo
// estático: en producción nadie lee el disco. Reemplazar el PDF es, como
// cualquier cambio de `public/`, cuestión de volver a desplegar.
export const dynamic = 'force-static'

const CV_DIRECTORY = path.join(process.cwd(), 'public', 'img', 'personal')

/**
 * El PDF más nuevo de la carpeta, se llame como se llame.
 *
 * El criterio es la fecha de modificación y no el nombre: así, subir un CV
 * actualizado alcanza para que el sitio lo entregue, sin tener que tocar
 * `header.json` ni respetar una convención de nombres. Si queda el anterior
 * al lado, gana el recién subido.
 */
async function findLatestCv(): Promise<string | null> {
  const entries = await readdir(CV_DIRECTORY)
  const pdfs = entries.filter((name) => name.toLowerCase().endsWith('.pdf'))
  if (pdfs.length === 0) return null

  const withDate = await Promise.all(
    pdfs.map(async (name) => ({
      name,
      modified: (await stat(path.join(CV_DIRECTORY, name))).mtimeMs,
    }))
  )

  return withDate.sort((a, b) => b.modified - a.modified)[0].name
}

// El nombre viaja en un encabezado: un salto de línea ahí parte la respuesta
// en dos. Nadie de afuera lo elige —sale del repo— pero sanearlo es gratis.
function asHeaderFilename(name: string) {
  return name.replace(/[\r\n"]/g, '')
}

export async function GET() {
  const filename = await findLatestCv()

  if (!filename) {
    logger.warn('CV no encontrado: no hay ningún PDF en public/img/personal')
    return new Response('CV no disponible', { status: 404 })
  }

  const bytes = await readFile(path.join(CV_DIRECTORY, filename))

  return new Response(new Uint8Array(bytes), {
    headers: {
      'Content-Type': 'application/pdf',
      // `inline` para que se abra en el visor del navegador; el nombre solo
      // importa cuando la persona lo guarda.
      'Content-Disposition': `inline; filename="${asHeaderFilename(filename)}"`,
    },
  })
}
