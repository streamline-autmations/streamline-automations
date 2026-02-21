/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // New Brand Colors
        'brand-dark': '#050505',
        'brand-purple': '#774CFC',
        'brand-glow': '#6f3efc',
        'brand-orange': '#F26A3D',
        'glass-surface': 'rgba(255, 255, 255, 0.03)',
        
        // Legacy colors for gradual migration
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        dark: {
          950: '#080808',
          900: '#101010',
          800: '#181818',
          700: '#202020',
          600: '#282828',
        },
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Ubuntu', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(139, 92, 246, 0.4)',
        'glow-hover': '0 0 30px rgba(124, 58, 237, 0.6)',
        'glow-orange': '0 0 20px rgba(240, 85, 35, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'circuit-pattern': 'linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px), linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px)',
      },
      backgroundSize: {
        'circuit': '20px 20px',
      },
      backdropBlur: {
        'glass': '16px',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        blob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        gradient: 'gradient 6s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 40s linear infinite',
        'blob': 'blob 6s ease-in-out infinite'
      },
    },
  },
  plugins: [],
};
