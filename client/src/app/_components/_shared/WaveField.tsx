const LINE_COUNT = 14
const WAVELENGTH = 500
const SPAN = 2000   // dos longitudes de onda de más, para que el bucle no se corte
const STEP = 25
const VIEW_HEIGHT = 400

// Cada línea deriva a su propio ritmo: las de arriba —más chicas y tenues—
// son el fondo y van lentas, las de abajo pasan más rápido. Es lo que separa
// un campo con profundidad de un bloque que se desliza entero.
const SLOWEST = 46
const FASTEST = 19

// Una onda muestreada: el período coincide con el desplazamiento de la
// animación, así el bucle cierra sin salto.
function wavePath(phase: number, amplitude: number, baseY: number) {
  const points: string[] = []

  for (let x = 0; x <= SPAN; x += STEP) {
    const y = baseY + Math.sin((x / WAVELENGTH + phase) * Math.PI * 2) * amplitude
    points.push(`${x} ${y.toFixed(1)}`)
  }

  return `M ${points.join(' L ')}`
}

/**
 * El campo de líneas del banner de Tomás, rehecho en SVG. Es el único
 * gesto decorativo de la página y vive solo en el primer panel.
 */
export default function WaveField() {
  return (
    <svg
      className='waveField'
      viewBox={`0 0 1000 ${VIEW_HEIGHT}`}
      preserveAspectRatio='none'
      aria-hidden='true'
      focusable='false'
    >
      <g>
        {Array.from({ length: LINE_COUNT }, (_, index) => {
          const ratio = index / (LINE_COUNT - 1)
          return (
            <path
              key={index}
              d={wavePath(ratio * 0.6, 26 + index * 4, VIEW_HEIGHT * 0.35 + index * 16)}
              opacity={0.14 + ratio * 0.5}
              style={{ animationDuration: `${(SLOWEST - ratio * (SLOWEST - FASTEST)).toFixed(1)}s` }}
            />
          )
        })}
      </g>
    </svg>
  )
}
