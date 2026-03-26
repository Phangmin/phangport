// @ts-nocheck
import { useEffect, useRef, useState } from 'react'

function RevealOnScroll(props) {
  const {
    as: Tag = 'div',
    className = '',
    children,
    delay = 0,
    duration = 860,
    distance = 18,
    threshold = 0.16,
    once = true,
    style,
    ...restProps
  } = props
  const elementRef = useRef(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') {
      return true
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      return undefined
    }

    const node = elementRef.current

    if (!node) {
      return undefined
    }

    if (typeof IntersectionObserver === 'undefined') {
      const fallbackId = window.requestAnimationFrame(() => {
        setIsVisible(true)
      })

      return () => {
        window.cancelAnimationFrame(fallbackId)
      }
    }

    const scrollRoot = document.getElementById('root')
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]

        if (entry?.isIntersecting) {
          setIsVisible(true)

          if (once) {
            observer.unobserve(entry.target)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        root: scrollRoot instanceof HTMLElement ? scrollRoot : null,
        threshold,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [once, threshold])

  return (
    <Tag
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'ease-out',
        transitionDelay: isVisible ? `${delay}s` : '0s',
        willChange: 'opacity, transform',
        ...style,
      }}
      {...restProps}
    >
      {children}
    </Tag>
  )
}

export default RevealOnScroll
