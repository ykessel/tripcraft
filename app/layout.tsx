import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ui/ThemeProvider'

export const metadata: Metadata = {
  title: 'Tripcraft — AI Travel Planner',
  description: 'Plan your perfect trip with smart itineraries and interactive maps. From destination to day-by-day plan in seconds.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Tripcraft',
  },
  openGraph: {
    title: 'Tripcraft — AI Travel Planner',
    description: 'Smart itineraries and interactive maps for every trip.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#10D9A0',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
