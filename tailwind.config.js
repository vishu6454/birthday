/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        deep: '#160D27',
        deepMid: '#1E1233',
        romantic: '#FF6B9D',
        softpink: '#FFC1D6',
        lavender: '#B69CFF',
        rosegold: '#E8B4B8',
        cream: '#FFF5F7',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        display: ['"Cormorant Garamond"', 'serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 107, 157, 0.35)',
        glowLg: '0 0 80px rgba(255, 107, 157, 0.45)',
        soft: '0 20px 60px -20px rgba(182, 156, 255, 0.35)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-mid': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 30px rgba(255,107,157,0.4)' },
          '50%': { boxShadow: '0 0 60px rgba(255,107,157,0.7)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.08)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
}