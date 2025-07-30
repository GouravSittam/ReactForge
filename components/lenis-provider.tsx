'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

interface LenisProviderProps {
  children: React.ReactNode
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize LENIS with basic configuration
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      infinite: false,
      wheelMultiplier: 1,
      lerp: 0.1,
    })

    // Expose LENIS instance globally for use in other components
    if (typeof window !== 'undefined') {
      (window as any).lenis = lenisRef.current
    }

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

  return <>{children}</>
}

// Hook to access LENIS instance
export const useLenis = () => {
  const lenisRef = useRef<Lenis | null>(null)
  return lenisRef.current
} 