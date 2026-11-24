import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles as SparkIcon, Crown } from 'lucide-react'
import AnimatedBackground from '../effects/AnimatedBackground'
import FloatingHearts from '../effects/FloatingHearts'
import Sparkles from '../effects/Sparkles'
import GlowButton from '../ui/GlowButton'

export default function WelcomeScreen({ onEnter }) {
  const [burst, setBurst] = useState(false)

  const handleEnter = () => {
    setBurst(true)
    // Let the burst play, then transition
    setTimeout(() => onEnter?.(), 900)
  }

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center px-5 py-16 overflow-hidden">
      <AnimatedBackground variant="welcome" />
      <FloatingHearts count={20} />
      <Sparkles count={50} />

      {/* Full-screen heart burst overlay */}
      <HeartBurst active={burst} />

      {/* Cinematic vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(13,7,24,0.65)_100%)]" />

      <div className="relative z-10 w-full max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-[2.5rem] px-6 py-12 md:px-14 md:py-16 text-center relative overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-romantic/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-lavender/20 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-[10px] md:text-xs tracking-[0.3em] uppercase text-softpink/90 mb-8"
          >
            <Crown size={14} className="text-rosegold" />
            A Royal Surprise Awaits
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-gradient-pink"
          >
            Hey Princess!
            <motion.span
              className="inline-block ml-2"
              animate={{ rotate: [-8, 8, -8] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              👑
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="mt-6 text-sm md:text-lg text-white/70 font-light tracking-wide max-w-xl mx-auto"
          >
            Someone has something very special planned for you…
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9 }}
            className="mt-10 flex justify-center"
          >
            <GlowButton onClick={handleEnter}>Press Button Princess</GlowButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-10 flex items-center justify-center gap-2 text-[10px] tracking-[0.35em] uppercase text-white/35"
          >
            <SparkIcon size={12} />
            A little magic, just for you
            <SparkIcon size={12} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-10 rounded-full bg-gradient-to-b from-romantic/70 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Full-screen heart burst — ~180 hearts fly outward from the center.
 * Pure DOM/Framer — no canvas, no heavy libs.
 */
function HeartBurst({ active }) {
  const COUNT = 180

  const hearts = Array.from({ length: COUNT }).map((_, i) => {
    const angle = (i / COUNT) * Math.PI * 2 + Math.random() * 0.4
    const distance = 200 + Math.random() * 500
    return {
      id: i,
      dx: Math.cos(angle) * distance,
      dy: Math.sin(angle) * distance,
      size: 10 + Math.random() * 22,
      delay: Math.random() * 0.25,
      rotate: Math.random() * 360,
    }
  })

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="burst"
          className="pointer-events-none fixed inset-0 z-[80]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          <div className="absolute top-1/2 left-1/2">
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute"
                style={{ width: h.size, height: h.size }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0.2,
                  rotate: h.rotate,
                }}
                animate={{
                  x: h.dx,
                  y: h.dy,
                  opacity: 0,
                  scale: 1,
                  rotate: h.rotate + 180,
                }}
                transition={{
                  duration: 1.6,
                  delay: h.delay,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <svg viewBox="0 0 24 24" width="100%" height="100%">
                  <defs>
                    <linearGradient id={`hb-${h.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFC1D6" />
                      <stop offset="100%" stopColor="#FF6B9D" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 21s-7.5-4.6-9.5-9.2C1 8.4 3 5 6.5 5c2 0 3.5 1.2 4.5 2.6C12 6.2 13.5 5 15.5 5 19 5 21 8.4 21 11.8 19.5 16.4 12 21 12 21z"
                    fill={`url(#hb-${h.id})`}
                  />
                </svg>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}