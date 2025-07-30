'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'

interface SmoothScrollLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({
  href,
  children,
  className = '',
  onClick
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an anchor link (starts with #), handle smooth scrolling
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (targetElement) {
        // Use LENIS if available, otherwise fallback to native smooth scroll
        const lenisInstance = (window as any).lenis
        if (lenisInstance) {
          const elementTop = targetElement.getBoundingClientRect().top + window.scrollY - 80 // Offset for navbar
          lenisInstance.scrollTo(elementTop, { duration: 1.2 })
        } else {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }
    
    // Call the onClick handler if provided
    if (onClick) {
      onClick()
    }
  }

  return (
    <Link
      ref={linkRef}
      href={href}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  )
} 