import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#080D0B',
        surface: '#0E1512',
        'surface-2': '#162019',
        accent: '#10D9A0',
        'accent-dim': '#0EA875',
        primary: '#EDF2EF',
        secondary: '#7A9488',
        muted: '#4A6358',
        border: '#182420',
        'border-2': '#223530',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'sans-serif'],
        body: ['var(--font-archivo)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
