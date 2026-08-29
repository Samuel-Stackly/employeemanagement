/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Libre Franklin"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        paper: '#F7F5EF',
        ink: {
          DEFAULT: '#1B2430',
          soft: '#3D4757',
          faint: '#8891A0',
        },
        teal: {
          50: '#EAF3F1',
          100: '#CFE4E0',
          400: '#2B8C7E',
          500: '#0F6E63',
          600: '#0B5A50',
          700: '#08453D',
        },
        gold: {
          50: '#FBF2DF',
          400: '#F4B942',
          500: '#D9A24B',
          600: '#B4813A',
        },
        rust: {
          50: '#FBEAE7',
          400: '#D9695C',
          500: '#C4463C',
          600: '#9E332A',
        },
        line: '#E3DFD4',
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
