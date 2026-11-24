import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react'

export default function MusicPlayer({ autoplayRequested = false }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [muted, setMuted] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.muted = muted
  }, [volume, muted])

  useEffect(() => {
    if (autoplayRequested && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [autoplayRequested])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    try {
      if (playing) { audio.pause(); setPlaying(false) }
      else { await audio.play(); setPlaying(true) }
    } catch (e) {
      console.warn('Audio play blocked', e)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <audio ref={audioRef} src="/music/birthday-song.mp3" loop preload="none" />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-strong rounded-2xl p-4 mb-3 w-64"
          >
            <div className="flex items-center gap-3 text-softpink/90 text-xs mb-3">
              <Music size={14} />
              <span className="tracking-widest uppercase">Birthday Melody</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMuted((m) => !m)}
                className="text-white/70 hover:text-romantic transition"
                aria-label={muted ? 'Unmute' : 'Mute'}
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range" min="0" max="1" step="0.01"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="flex-1 accent-romantic"
                aria-label="Volume"
              />
            </div>
            <p className="text-[10px] text-white/40 mt-2">Add <code>public/music/birthday-song.mp3</code></p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <motion.button
          onClick={() => setOpen((o) => !o)}
          whileTap={{ scale: 0.9 }}
          className="glass-strong w-11 h-11 rounded-full flex items-center justify-center text-softpink hover:text-white transition"
          aria-label="Music settings"
        >
          <Music size={18} />
        </motion.button>
        <motion.button
          onClick={toggle}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.92 }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center text-white"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #B69CFF)', boxShadow: '0 8px 30px -8px rgba(255,107,157,0.8)' }}
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing && (
            <motion.span
              className="absolute inset-0 rounded-full border border-romantic/60"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          )}
          {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </motion.button>
      </div>
    </div>
  )
}