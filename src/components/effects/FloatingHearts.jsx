import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function FloatingHearts({ count = 18 }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 12 + Math.random() * 22,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        opacity: 0.15 + Math.random() * 0.35,
        rotate: Math.random() * 40 - 20,
      })),
    [count]
  )

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          initial={{ y: '110vh', x: `${h.left}vw`, rotate: h.rotate }}
          animate={{
            y: '-10vh',
            x: [`${h.left}vw`, `${h.left + (Math.random() * 8 - 4)}vw`],
            rotate: [h.rotate, h.rotate + 15, h.rotate - 10],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ opacity: h.opacity }}
          className="absolute"
        >
          <svg width={h.size} height={h.size} viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s-7.5-4.6-9.5-9.2C1 8.4 3 5 6.5 5c2 0 3.5 1.2 4.5 2.6C12 6.2 13.5 5 15.5 5 19 5 21 8.4 21 11.8 19.5 16.4 12 21 12 21z"
              fill="url(#hg)"
            />
            <defs>
              <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#FFC1D6" />
                <stop offset="1" stopColor="#FF6B9D" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  )
}