import { motion } from 'framer-motion'

export default function AnimatedBackground({ variant = 'welcome' }) {
  const palettes = {
    welcome: ['#2a1240', '#160D27', '#1d0f33'],
    birthday: ['#2b0f39', '#1a0820', '#3a0f33'],
    gallery: ['#160D27', '#201030', '#160D27'],
    quotes: ['#1a0a2e', '#160D27', '#2a1240'],
    final: ['#241135', '#160D27', '#1d0f33'],
  }
  const c = palettes[variant] || palettes.welcome

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${c[0]} 0%, ${c[1]} 45%, ${c[2]} 100%)`,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      {/* Glowing blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.35), transparent 70%)' }}
        animate={{ x: [0, 60, -30, 0], y: [0, 40, -20, 0], scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(182,156,255,0.28), transparent 70%)' }}
        animate={{ x: [0, -70, 30, 0], y: [0, -50, 30, 0], scale: [1, 1.2, 0.9, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-[400px] h-[400px] rounded-full blur-3xl -translate-x-1/2"
        style={{ background: 'radial-gradient(circle, rgba(255,193,214,0.18), transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(circle at 50% 40%, black, transparent 75%)',
        }}
      />
    </div>
  )
}