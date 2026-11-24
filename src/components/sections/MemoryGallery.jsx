import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Heart, Play, Pause } from 'lucide-react'
import { photos } from '../../data/photos'
import AnimatedBackground from '../effects/AnimatedBackground'
import SectionHeading from '../ui/SectionHeading'

export default function MemoryGallery() {
  const [active, setActive] = useState(null)
  const [slideshow, setSlideshow] = useState(true)
  const timerRef = useRef(null)

  // Auto-advance slideshow every 4.5s
  useEffect(() => {
    if (!slideshow) return
    timerRef.current = setInterval(() => {
      setActive((curr) => {
        if (curr === null) return 0
        return (curr + 1) % photos.length
      })
    }, 4500)
    return () => clearInterval(timerRef.current)
  }, [slideshow])

  // Pause auto-advance if user opens a photo manually via card click
  const openPhoto = (i) => {
    setSlideshow(false)
    setActive(i)
  }
  const closeLightbox = () => setActive(null)
  const next = () => setActive((i) => (i + 1) % photos.length)
  const prev = () => setActive((i) => (i - 1 + photos.length) % photos.length)

  return (
    <section className="relative py-24 md:py-32 px-5 overflow-hidden">
      <AnimatedBackground variant="gallery" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="The Memory Collection"
          eyebrowIcon={<Heart size={12} />}
          title="Her Beautiful"
          accent="Memories"
          subtitle="A curated collection of moments where the world paused just to admire you."
          className="mb-10"
        />

        {/* Slideshow toggle */}
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setSlideshow((s) => !s)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[10px] tracking-[0.3em] uppercase text-softpink/80 hover:text-white transition"
            aria-pressed={slideshow}
          >
            {slideshow ? <Pause size={12} /> : <Play size={12} />}
            {slideshow ? 'Slideshow On' : 'Slideshow Off'}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {photos.map((p, i) => (
            <PhotoCard
              key={p.id}
              photo={p}
              index={i}
              featured={i === 0 || i === 4}
              onClick={() => openPhoto(i)}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[10px] tracking-[0.35em] uppercase text-white/30 mt-16"
        >
          Tap any memory to relive it ✨
        </motion.p>
      </div>

      <AnimatePresence>
        {active !== null && (
          <Lightbox
            photo={photos[active]}
            index={active}
            total={photos.length}
            onClose={closeLightbox}
            onNext={next}
            onPrev={prev}
            slideshow={slideshow}
            onToggleSlideshow={() => setSlideshow((s) => !s)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function PhotoCard({ photo, index, featured, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-[1.75rem] text-left focus:outline-none ${
        featured ? 'sm:col-span-2 lg:col-span-1 lg:row-span-1' : ''
      }`}
      aria-label={`Open memory: ${photo.caption}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-deepMid">
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
            e.currentTarget.parentElement
              .querySelector('.placeholder')
              ?.classList.remove('hidden')
          }}
        />

        <div className="placeholder hidden absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-deepMid to-deep border border-white/10">
          <Heart size={48} className="text-romantic/40 mb-3" />
          <p className="text-white/40 text-xs tracking-widest uppercase">Memory</p>
          <p className="text-white/25 text-[10px] mt-1 px-4 text-center break-all">
            {photo.src}
          </p>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] tracking-[0.25em] uppercase text-white/85">
          {photo.tag}
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5 md:p-6">
          <p className="font-cursive italic text-xl md:text-2xl text-white leading-snug drop-shadow-lg">
            {photo.caption}
          </p>
          <div className="mt-2 h-[1px] w-10 bg-gradient-to-r from-romantic to-transparent group-hover:w-20 transition-all duration-500" />
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden rounded-[1.75rem]">
          <div className="absolute -inset-x-1/2 -top-1/2 h-[200%] w-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1.5s]" />
        </div>
      </div>
    </motion.button>
  )
}

function Lightbox({
  photo,
  index,
  total,
  onClose,
  onNext,
  onPrev,
  slideshow,
  onToggleSlideshow,
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-xl"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition z-10"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-3 md:left-8 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition z-10"
        aria-label="Previous photo"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-3 md:right-8 w-11 h-11 rounded-full glass-strong flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition z-10"
        aria-label="Next photo"
      >
        <ChevronRight size={22} />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative w-full rounded-[1.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black"
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full max-h-[70vh] object-contain"
              onError={(e) => (e.currentTarget.style.opacity = 0.2)}
            />
          </motion.div>
        </AnimatePresence>

        <p className="font-cursive italic text-xl md:text-3xl text-white/90 mt-6 text-center">
          {photo.caption}
        </p>

        <div className="mt-4 flex items-center gap-4 text-white/50 text-xs tracking-widest">
          <span>{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSlideshow() }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass hover:text-white transition"
            aria-pressed={slideshow}
          >
            {slideshow ? <Pause size={11} /> : <Play size={11} />}
            {slideshow ? 'Auto' : 'Manual'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}