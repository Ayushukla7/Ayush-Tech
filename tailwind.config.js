/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#070b19',
          800: '#0d1527',
          700: '#14213d',
        },
        cyan: {
          glow: '#00f2fe',
        },
        solar: {
          sun: '#ffaa00',
          mercury: '#a8a29e',
          venus: '#f59e0b',
          earth: '#38bdf8',
          mars: '#ef4444',
          jupiter: '#f97316',
          saturn: '#eab308',
          uranus: '#06b6d4',
          neptune: '#3b82f6',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace', 'Consolas'],
        display: ['"Space Grotesk"', 'sans-serif'],
        orbitron: ['"Orbitron"', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'orbit-slow': 'spin 60s linear infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
