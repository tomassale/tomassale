"use client"
import { useCursorTrail } from './useCursorTrail'

/**
 * Dibuja el cursor propio. Toda la lógica vive en el hook: acá solo se
 * traduce su estado a clases.
 */
export default function CursorTrail() {
  const { dotRef, ringRef, enabled, target, pressed, visible } = useCursorTrail()

  if (!enabled) return null

  const classes = [
    'cursorTrail',
    `cursorTrail--${target}`,
    pressed && 'cursorTrail--pressed',
    !visible && 'cursorTrail--away',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} aria-hidden='true'>
      <div ref={ringRef} className='cursorTrail__ring' />
      <div ref={dotRef} className='cursorTrail__dot' />
    </div>
  )
}
