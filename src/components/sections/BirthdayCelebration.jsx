import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti'
import { Cake, Sparkles as SparkIcon, PartyPopper, Flame } from 'lucide-react'
import { useAge } from '../../hooks/useAge'
import AnimatedBackground from '../effects/AnimatedBackground'
import FloatingHearts from '../effects/FloatingHearts'
import Sparkles from '../effects/Sparkles'

export default function BirthdayCelebration() {
  const age = useAge('2002-11-25T00:00:00')
  const [candlesLit, setCandlesLit] = useState(true)
  const [burst, setBurst] = useState(false)

  const now = useMemo(() => new Date(), [])

  const blowCandles = () => {
    setCandlesLit(false)
    setBurst(true)
    setTimeout(() => setBurst(false), 6000)
  }

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center px-5 py-20 overflow-hidden">
      <AnimatedBackground variant="birthday" />
      <FloatingHearts count={16} />
      <Sparkles count={60} />

      {burst && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <Confetti
            numberOfPieces={600}
            colors={['#FF6B9D', '#FFC1D6', '#B69CFF', '#FFFFFF', '#E8B4B8']}
            gravity={0.18}
            tweenDuration={8000}
            recycle={false}
          />
        </div>
      )}

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-[10px] md:text-xs tracking-[0.3em] uppercase text-softpink/90 mb-8"
        >
          <PartyPopper size={14} className="text-romantic" />
          The Celebration Has Begun
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-gradient-pink"
        >
          Happy Birthday
          <br />
          <span className="font-cursive italic text-white/95 text-6xl md:text-8xl lg:text-9xl">Soni</span>
          <motion.span
            className="inline-block ml-3"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            🎂
          </motion.span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-sm md:text-lg text-white/70 font-light max-w-2xl mx-auto"
        >
          Today is all about you, my beautiful princess. ❤️
        </motion.p>

        {/* 3D Cake */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-14 flex justify-center perspective-[1200px]"
        >
          <Cake3D candlesLit={candlesLit} onBlow={blowCandles} />
        </motion.div>

        {/* Age + live info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-5 max-w-2xl mx-auto"
        >
          <InfoCard label="Age" value={`${age}`} unit="years young" icon={<Cake size={16} />} />
          <InfoCard label="Born" value="25 Nov 2002" unit="a beautiful day" icon={<SparkIcon size={16} />} />
          <InfoCard label="Status" value="The Birthday Girl" unit="queen of today" icon={<Flame size={16} />} className="col-span-2 sm:col-span-1" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-10 text-xs text-white/40 tracking-widest uppercase"
        >
          {now.toDateString()} • {candlesLit ? 'Tap the cake to blow the candles' : 'Wishes made. Magic set in motion ✨'}
        </motion.p>
      </div>
    </section>
  )
}

function InfoCard({ label, value, unit, icon }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-2xl px-4 py-5 text-left border-white/10 hover:border-romantic/30 transition-colors"
    >
      <div className="flex items-center gap-2 text-softpink/80 text-[10px] tracking-[0.25em] uppercase mb-2">
        {icon} {label}
      </div>
      <div className="font-serif text-xl md:text-2xl text-white">{value}</div>
      <div className="text-[11px] text-white/45 mt-1">{unit}</div>
    </motion.div>
  )
}

function Cake3D({ candlesLit, onBlow }) {
  const candles = [1, 2, 3, 4, 5]
  return (
    <button
      onClick={onBlow}
      disabled={!candlesLit}
      className="relative group focus:outline-none"
      aria-label={candlesLit ? 'Blow out the candles' : 'Candles blown out'}
    >
      <motion.div
        animate={{ rotateY: [-6, 6, -6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Plate */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[240px] md:w-[300px] h-4 rounded-full bg-gradient-to-b from-white/20 to-white/5 blur-[2px]" />

        {/* Cake base */}
        <div className="relative w-[200px] md:w-[260px] h-[130px] md:h-[160px] rounded-t-[40px] rounded-b-2xl bg-gradient-to-b from-[#FFC1D6] via-[#FF8FB5] to-[#FF6B9D] shadow-[0_20px_60px_-10px_rgba(255,107,157,0.5)]">
          {/* Frosting drips */}
          <div className="absolute -top-2 inset-x-0 flex justify-around">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-3 md:w-4 h-5 md:h-7 rounded-b-full bg-white/80" style={{ height: `${10 + Math.random() * 14}px` }} />
            ))}
          </div>
          {/* Decorative dots */}
          <div className="absolute inset-x-6 top-10 flex justify-between">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/70" />
            ))}
          </div>
          <div className="absolute inset-x-8 bottom-6 flex justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/60" />
            ))}
          </div>
        </div>

        {/* Candles */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-end gap-3 md:gap-4">
          {candles.map((c, i) => (
            <div key={c} className="relative flex flex-col items-center">
              <AnimatePresence>
                {candlesLit && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                    className="w-2 h-3 rounded-full mb-1"
                    style={{
                      background: 'radial-gradient(circle at 50% 70%, #FFE29F 0%, #FF8A5B 60%, transparent 100%)',
                      boxShadow: '0 0 14px 4px rgba(255,138,91,0.8)',
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="w-2 md:w-2.5 h-10 md:h-12 rounded-sm bg-gradient-to-b from-white to-[#FFC1D6]" />
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-6 text-xs tracking-[0.3em] uppercase text-white/40 group-hover:text-softpink/80 transition">
        {candlesLit ? 'Tap to make a wish ✨' : 'Wish granted ❤️'}
      </div>
    </button>
  )
}