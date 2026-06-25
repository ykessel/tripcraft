import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Static dark-mode colours (used in dashboard/trip detail where there's no theme toggle)
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
        display: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        body: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
export default config
