"use client"
import { useEffect, useRef, useState, ReactNode } from 'react'

type Animation = 'up' | 'down' | 'left' | 'right' | 'zoom'

interface RevealProps {
  readonly children: ReactNode
  readonly className?: string
  readonly delay?: number
  readonly animation?: Animation
}

export default function Reveal({ children, className = '', delay = 0, animation = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target) // se anima una sola vez
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal reveal--${animation} ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
