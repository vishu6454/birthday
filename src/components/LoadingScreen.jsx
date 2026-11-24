import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function LoadingScreen({ onDone }) {
  // Reliable timer — fires once after 2.6s
  useEffect(() => {
    const t = setTimeout(() => {
      onDone?.()
    }, 2600)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      style={{
        background:
          'radial-gradient(circle at 50% 40%, #2a1240 0%, #160D27 60%, #0d0718 100%)',
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
    >
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-8 text-romantic"
      >
        <Heart size={64} fill="currentColor" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="font-serif text-2xl md:text-4xl text-center text-gradient-pink"
      >
        Preparing something special for Soni…
      </motion.h1>

      <motion.div
        className="mt-10 h-[2px] w-56 bg-white/10 rounded-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #FF6B9D, #B69CFF, #FFC1D6)',
          }}
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="mt-6 text-xs tracking-[0.4em] uppercase text-white/40"
      >
        Made with love ❤️
      </motion.p>
    </motion.div>
  )
}