import { motion } from 'framer-motion'

/**
 * Reusable section heading with eyebrow, editorial title,
 * cursive accent, and subtitle — used across sections.
 */
export default function SectionHeading({
  eyebrow,
  eyebrowIcon,
  title,
  accent,          // cursive part of the title
  subtitle,
  align = 'center',
  className = '',
}) {
  const alignClass =
    align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col ${alignClass} ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-[10px] tracking-[0.3em] uppercase text-softpink/90 mb-6">
          {eyebrowIcon}
          {eyebrow}
        </div>
      )}

      {title && (
        <h2 className="font-serif text-4xl md:text-6xl text-gradient-pink leading-tight">
          {title}{' '}
          {accent && (
            <span className="font-cursive italic text-white/95">{accent}</span>
          )}
        </h2>
      )}

      {subtitle && (
        <p className="mt-4 text-white/55 text-sm md:text-base font-light max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}