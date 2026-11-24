import { useEffect, useRef } from 'react'

export default function CursorSparkles() {
  const layerRef = useRef(null)
  const lastEmit = useRef(0)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const layer = layerRef.current
    if (!layer) return

    const onMove = (e) => {
      const now = performance.now()
      if (now - lastEmit.current < 40) return
      lastEmit.current = now
      const spark = document.createElement('div')
      const size = 4 + Math.random() * 4
      spark.style.cssText = `
        position:absolute;
        left:${e.clientX - size / 2}px;
        top:${e.clientY - size / 2}px;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:radial-gradient(circle, #FFC1D6 0%, #FF6B9D 70%, transparent 100%);
        box-shadow: 0 0 10px rgba(255,107,157,0.8);
        pointer-events:none;
        transition: transform 0.9s ease-out, opacity 0.9s ease-out;
        opacity: 1;
      `
      layer.appendChild(spark)
      requestAnimationFrame(() => {
        spark.style.transform = `translate(${(Math.random() - 0.5) * 40}px, ${(Math.random() - 0.5) * 40 + 20}px) scale(0.2)`
        spark.style.opacity = '0'
      })
      setTimeout(() => spark.remove(), 1000)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return <div ref={layerRef} className="cursor-layer" aria-hidden="true" />
}