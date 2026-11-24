import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function GlowButton({ children, onClick, icon = true, className = '' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group relative inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 rounded-full font-medium tracking-wide text-white overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #FF6B9D 0%, #B69CFF 100%)',
        boxShadow: '0 10px 40px -10px rgba(255,107,157,0.8), 0 0 0 1px rgba(255,255,255,0.2) inset',
      }}
      aria-label={typeof children === 'string' ? children : 'Action button'}
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, #B69CFF 0%, #FF6B9D 100%)' }}
      />
      <span
        className="absolute inset-0 rounded-full opacity-40 group-hover:opacity-70 blur-md transition-opacity duration-500"
        style={{ background: 'linear-gradient(135deg, #FFC1D6, #FF6B9D)', zIndex: -1 }}
      />
      {icon && (
        <motion.span
          className="relative z-10 inline-flex"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Heart size={20} fill="currentColor" strokeWidth={0} />
        </motion.span>
      )}
      <span className="relative z-10 text-sm md:text-base">{children}</span>
    </motion.button>
  )
}