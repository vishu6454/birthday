import { useEffect, useState } from 'react'

/**
 * Tracks the pointer position. Returns { x, y } in pixels.
 * Automatically disables on touch devices.
 */
export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Skip on touch-only devices
    if (typeof window === 'undefined') return
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => setPosition({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return position
}

export default useMousePosition