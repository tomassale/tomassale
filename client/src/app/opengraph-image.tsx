import { ImageResponse } from 'next/og'
import { JOB_TITLE, OG_IMAGE, PERSON_NAME, SITE_URL } from '@/lib/site'

// Tarjeta que muestran LinkedIn, WhatsApp, X y compañía al compartir el
// enlace. Se genera una sola vez, en el build, con la paleta del sitio
// (globals.scss) y el `</>` del favicon. Sin fuente propia a propósito:
// Sora y Manrope vienen en woff2, que el generador no lee, y la fuente por
// defecto alcanza para tres líneas de texto.
export const alt = OG_IMAGE.alt
export const size = { width: OG_IMAGE.width, height: OG_IMAGE.height }
export const contentType = 'image/png'

const NIGHT = '#050b1e'
const INK = '#e6ecff'
const INK_DIM = '#8290c2'
const VOLT = '#22e4ff'

const BRAND_MARK = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="20 10 355 205">
  <defs>
    <linearGradient id="g" x1="32" y1="0" x2="362" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#8eccff"/><stop offset="1" stop-color="#dc8cfc"/>
    </linearGradient>
  </defs>
  <g fill="none" stroke="url(#g)" stroke-width="44" stroke-linecap="round" stroke-linejoin="round">
    <path d="M99 65 54 112 99 160"/><path d="M165 180 229 45"/><path d="M296 65 341 112 296 160"/>
  </g>
</svg>`

export default function OpengraphImage() {
  const [firstNames, lastName] = splitLastName(PERSON_NAME)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: `radial-gradient(circle at 85% 20%, rgba(34, 228, 255, 0.18), transparent 55%), ${NIGHT}`,
          color: INK,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- Satori no usa next/image */}
        <img
          src={`data:image/svg+xml;utf8,${encodeURIComponent(BRAND_MARK)}`}
          width={180}
          height={104}
          alt=''
        />
        <div style={{ display: 'flex', marginTop: 48, fontSize: 88, letterSpacing: -2 }}>
          {firstNames}&nbsp;<span style={{ color: VOLT }}>{lastName}</span>
        </div>
        <div style={{ display: 'flex', marginTop: 12, fontSize: 40, color: VOLT }}>{JOB_TITLE}</div>
        <div style={{ display: 'flex', marginTop: 56, fontSize: 30, color: INK_DIM }}>
          {new URL(SITE_URL).hostname}
        </div>
      </div>
    ),
    size
  )
}

// Igual que el hero: el apellido va resaltado.
function splitLastName(fullName: string): [string, string] {
  const cut = fullName.lastIndexOf(' ')
  return [fullName.slice(0, cut), fullName.slice(cut + 1)]
}
