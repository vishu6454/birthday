import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, Quote } from 'lucide-react'
import { quotes } from '../../data/quotes'
import AnimatedBackground from '../effects/AnimatedBackground'

export default function LoveQuotes() {
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    setDisplayed('')
    setTyping(true)
    let i = 0
    const full = quotes[index]
    const timer = setInterval(() => {
      i++
      setDisplayed(full.slice(0, i))
      if (i >= full.length) {
        clearInterval(timer)
        setTyping(false)
      }
    }, 35)
    return () => clearInterval(timer)
  }, [index])

  const next = () => setIndex((i) => (i + 1) % quotes.length)
  const prev = () => setIndex((i) => (i - 1 + quotes.length) % quotes.length)

  return (
    <section className="relative py-24 md:py-32 px-5 overflow-hidden">
      <AnimatedBackground variant="quotes" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-[10px] tracking-[0.3em] uppercase text-softpink/90 mb-10"
        >
          <Heart size={12} /> Words From My Heart
        </motion.div>

        <Quote size={42} className="mx-auto text-romantic/60 mb-6" />

        <div className="min-h-[200px] md:min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-serif italic text-2xl md:text-4xl lg:text-5xl leading-snug text-white px-2"
            >
              {displayed}
              {typing && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-[2px] md:w-[3px] h-[1em] bg-romantic ml-1 align-middle"
                />
              )}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={prev}
            className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/80 hover:text-romantic transition border-white/10"
            aria-label="Previous quote"
          >
            <ChevronLeft size={20} />
          </motion.button>

          <div className="flex items-center gap-1.5 px-4">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === index ? 'w-8 bg-romantic' : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
                aria-label={`Go to quote ${i + 1}`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={next}
            className="w-12 h-12 rounded-full glass-strong flex items-center justify-center text-white/80 hover:text-romantic transition border-white/10"
            aria-label="Next quote"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>

        <p className="mt-8 text-[10px] tracking-[0.35em] uppercase text-white/30">
          {String(index + 1).padStart(2, '0')} / {String(quotes.length).padStart(2, '0')}
        </p>
      </div>
    </section>
  )
}