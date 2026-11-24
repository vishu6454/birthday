import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Mail, Sparkles as SparkIcon, Crown } from 'lucide-react'
import AnimatedBackground from '../effects/AnimatedBackground'
import FloatingHearts from '../effects/FloatingHearts'

export default function FinalSurprise() {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative py-24 md:py-32 px-5 overflow-hidden">
      <AnimatedBackground variant="final" />
      <FloatingHearts count={14} />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-[10px] tracking-[0.3em] uppercase text-softpink/90 mb-10"
        >
          <Crown size={12} className="text-rosegold" /> The Final Surprise
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="font-serif text-4xl md:text-6xl text-gradient-pink leading-tight"
        >
          One Last Thing,
          <br />
          <span className="font-cursive italic text-white/95 text-5xl md:text-7xl">My Princess</span> ❤️
        </motion.h2>

        <AnimatePresence mode="wait">
          {!open ? (
            <Envelope key="envelope" onOpen={() => setOpen(true)} />
          ) : (
            <Letter key="letter" />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

function Envelope({ onOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.4 } }}
      transition={{ duration: 0.8 }}
      className="mt-16 flex flex-col items-center"
    >
      <motion.button
        onClick={onOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
        className="relative group"
        aria-label="Open the love letter"
      >
        {/* Glow */}
        <div className="absolute inset-0 -inset-x-8 -inset-y-8 rounded-full bg-romantic/20 blur-3xl animate-pulse-glow" />

        <svg width="240" height="170" viewBox="0 0 240 170" className="relative drop-shadow-2xl">
          <defs>
            <linearGradient id="env" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFC1D6" />
              <stop offset="100%" stopColor="#FF8FB5" />
            </linearGradient>
            <linearGradient id="flap" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF9FBF" />
              <stop offset="100%" stopColor="#FF6B9D" />
            </linearGradient>
          </defs>
          <rect x="10" y="20" width="220" height="140" rx="12" fill="url(#env)" />
          <path d="M10 20 L120 100 L230 20 Z" fill="url(#flap)" opacity="0.9" />
          <circle cx="120" cy="110" r="16" fill="#B69CFF" />
          <path d="M120 104 L122.5 110 L129 110.5 L124 114.5 L125.5 121 L120 117.5 L114.5 121 L116 114.5 L111 110.5 L117.5 110 Z" fill="#fff" />
        </svg>

        <div className="mt-6 flex items-center justify-center gap-2 text-softpink/80 group-hover:text-romantic transition">
          <Mail size={16} />
          <span className="text-xs tracking-[0.3em] uppercase">Tap to open</span>
          <SparkIcon size={14} />
        </div>
      </motion.button>
    </motion.div>
  )
}

function Letter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-14 mx-auto max-w-2xl"
    >
      <div className="relative glass-strong rounded-[2rem] px-6 py-10 md:px-12 md:py-14 text-left shadow-soft overflow-hidden">
        {/* Soft glow corners */}
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-romantic/15 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-56 h-56 rounded-full bg-lavender/15 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-softpink/80 mb-6">
            <Heart size={12} fill="currentColor" /> A letter for you
          </div>

          <p className="font-cursive text-3xl md:text-4xl text-gradient-pink mb-6">Dear Soni,</p>

          {[
            'Happy Birthday to the most beautiful person in my world.',
            'I hope your life is always filled with happiness, endless smiles, beautiful memories and all the love you deserve.',
            'You are precious, you are special, and you deserve nothing less than the best.',
            'Keep smiling, Princess. ❤️',
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.7 }}
              className="text-white/80 text-sm md:text-base leading-relaxed mb-4 font-light"
            >
              {line}
            </motion.p>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between"
          >
            <div>
              <p className="font-serif text-xl md:text-2xl text-white">Happy Birthday Once Again!</p>
              <p className="text-sm text-softpink/80 mt-1">🎂 👑</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="text-romantic"
            >
              <Heart size={32} fill="currentColor" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        className="text-center text-[10px] tracking-[0.4em] uppercase text-white/30 mt-10"
      >
        Forever yours, always ❤️
      </motion.p>
    </motion.div>
  )
}