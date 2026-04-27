import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealOptions {
  y?: number
  x?: number
  opacity?: number
  duration?: number
  stagger?: number
  ease?: string
  start?: string
  delay?: number
}

/**
 * Attach this hook to a container ref. All elements matching `selector` inside
 * the container will fade in when they enter the viewport.
 */
export function useScrollReveal(
  selector: string = '[data-reveal]',
  options: ScrollRevealOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const {
      y = 50,
      x = 0,
      opacity = 0,
      duration = 0.8,
      stagger = 0.15,
      ease = 'power3.out',
      start = 'top 85%',
      delay = 0,
    } = options

    const elements = containerRef.current?.querySelectorAll(selector)
    if (!elements || elements.length === 0) return

    gsap.set(elements, { y, x, opacity })

    ScrollTrigger.create({
      trigger: containerRef.current,
      start,
      onEnter: () => {
        gsap.to(elements, {
          y: 0,
          x: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
          delay,
        })
      },
      once: true,
    })
  }, { scope: containerRef })

  return containerRef
}
