'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export const useSmoothScroll = () => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize LENIS
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
    })

    // RAF loop
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
    }
  }, [])

  const scrollTo = (target: string | number, options?: { offset?: number }) => {
    if (lenisRef.current) {
      if (typeof target === 'string') {
        const element = document.querySelector(target)
        if (element) {
          const offset = options?.offset || 0
          const elementTop = element.getBoundingClientRect().top + window.scrollY - offset
          lenisRef.current.scrollTo(elementTop, { duration: 1.2 })
        }
      } else {
        lenisRef.current.scrollTo(target, { duration: 1.2 })
      }
    }
  }

  const scrollToTop = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { duration: 1.2 })
    }
  }

  const scrollToBottom = () => {
    if (lenisRef.current) {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      lenisRef.current.scrollTo(scrollHeight - clientHeight, { duration: 1.2 })
    }
  }

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    scrollToBottom,
  }
} 