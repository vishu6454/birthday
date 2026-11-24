
import './App.css'
import { useEffect, useState, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import WelcomeScreen from './components/sections/WelcomeScreen'
import BirthdayCelebration from './components/sections/BirthdayCelebration'
import MemoryGallery from './components/sections/MemoryGallery'
import LoveQuotes from './components/sections/LoveQuotes'
import FinalSurprise from './components/sections/FinalSurprise'
import MusicPlayer from './components/ui/MusicPlayer'
import CursorSparkles from './components/effects/CursorSparkles'
import FallingPetals from './components/effects/FallingPetals'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [autoplay, setAutoplay] = useState(false)
  const celebrationRef = useRef(null)

  useEffect(() => {
    document.title = 'For Soni 👑 — Happy Birthday Princess'

    // Apply reduced-motion class if user prefers
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('reduce-motion')
    }
  }, [])

  const handleEnter = () => {
    setAutoplay(true)
    // Scroll to celebration section after a brief moment
    setTimeout(() => {
      celebrationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 250)
  }

  return (
    <div className="relative min-h-screen bg-deep text-white grain overflow-x-hidden">
      <CursorSparkles />

      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <MusicPlayer autoplayRequested={autoplay} />

          <main>
            <WelcomeScreen onEnter={handleEnter} />

            <div ref={celebrationRef}>
              <BirthdayCelebration />
            </div>

            <MemoryGallery />
            <LoveQuotes />

            <div className="relative">
              <FallingPetals count={10} />
              <FinalSurprise />
            </div>

            <footer className="relative z-10 py-14 text-center px-5">
              <div className="w-16 h-[1px] mx-auto mb-6 bg-gradient-to-r from-transparent via-romantic to-transparent" />
              <p className="font-cursive italic text-2xl md:text-3xl text-gradient-pink">
                Made with endless love ❤️
              </p>
              <p className="mt-3 text-[10px] tracking-[0.4em] uppercase text-white/30">
                For Soni • 25 November • Forever
              </p>
            </footer>
          </main>
        </>
      )}
    </div>
  )
}