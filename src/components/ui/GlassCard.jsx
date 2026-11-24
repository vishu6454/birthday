import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-strong rounded-[2rem] shadow-soft ${className}`}
    >
      {children}
    </motion.div>
  )
}