/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#06070a',
          900: '#0a0c12',
          850: '#0f121a',
          800: '#151926',
          700: '#202638',
        },
        f1: {
          red: '#e10600',
          redGlow: '#ff2a2a',
          cyan: '#00f2fe',
          cyanGlow: '#38bdf8',
          carbon: '#12141a',
          silver: '#e2e8f0',
          gold: '#f59e0b',
        },
        brand: {
          cyan: '#00f2fe',
          blue: '#3b82f6',
          lime: '#ccff00',
          amber: '#f59e0b',
          red: '#e10600',
        }
      },
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marqueeReverse 25s linear infinite',
        'spin-slow': 'spin 18s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'telemetry-scan': 'telemetryScan 4s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        telemetryScan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      }
    },
  },
  plugins: [],
}
