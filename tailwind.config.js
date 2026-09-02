
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/*/.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Libre Franklin"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#fbfbf7',
        ink: {
          DEFAULT: '#1A1D29',
          soft: '#4B5165',
          faint: '#9298AA',
        },
        teal: {
          50: '#EEF0FC',
          100: '#DDE1F9',
          400: '#6C63FF',
          500: '#4B44D6',
          600: '#3730A3',
          700: '#2A2478',
        },
        gold: {
          50: '#FEF6E7',
          400: '#F2B84B',
          500: '#E2A130',
          600: '#B87F1F',
        },
        rust: {
          50: '#FDEDEC',
          400: '#F0776A',
          500: '#E14F41',
          600: '#B93A2E',
        },
        line: '#E4E7EE',
      },
      boxShadow: {
        card: '0 1px 2px rgba(27, 36, 48, 0.06), 0 1px 0 rgba(27, 36, 48, 0.04)',
        panel: '0 8px 30px rgba(27, 36, 48, 0.12)',
      },
      borderRadius: {
        sm: '4px',
      },
    },
  },
  plugins: [],
}