import { motion } from 'framer-motion'
import { useMemo } from 'react'

/**
 * Falling rose petals — pure SVG, GPU-friendly.
 * Respects prefers-reduced-motion by rendering nothing.
 */
export default function FallingPetals({ count = 14 }) {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 10,
        size: 10 + Math.random() * 14,
        rotate: Math.random() * 360,
        sway: (Math.random() - 0.5) * 60,
        opacity: 0.35 + Math.random() * 0.35,
      })),
    [count]
  )

  if (reduceMotion) return null

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {petals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          initial={{
            y: '-10vh',
            x: `${p.left}vw`,
            rotate: p.rotate,
            opacity: 0,
          }}
          animate={{
            y: '110vh',
            x: [`${p.left}vw`, `${p.left + p.sway / 10}vw`, `${p.left}vw`],
            rotate: p.rotate + 360,
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: p.size, height: p.size }}
        >
          <svg viewBox="0 0 32 32" width="100%" height="100%">
            <defs>
              <radialGradient id={`petal-${p.id}`} cx="50%" cy="40%" r="70%">
                <stop offset="0%" stopColor="#FFC1D6" />
                <stop offset="55%" stopColor="#FF6B9D" />
                <stop offset="100%" stopColor="#C44A75" />
              </radialGradient>
            </defs>
            <path
              d="M16 2 C 22 8, 30 12, 26 22 C 22 30, 10 30, 6 22 C 2 12, 10 8, 16 2 Z"
              fill={`url(#petal-${p.id})`}
              opacity="0.9"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}