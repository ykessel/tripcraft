import Link from 'next/link'
import { Globe, Map, Bookmark, Zap } from 'lucide-react'
import { SUPPORTED_DESTINATIONS } from '@/lib/mock-itineraries'
import PlannerSection from '@/components/trip/PlannerSection'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/60 backdrop-blur-xl bg-background/80">
        <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="font-display font-bold text-sm text-primary tracking-tight">Tripcraft</span>
          </div>
          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href="/dashboard"
                className="text-xs font-mono text-secondary hover:text-primary transition border border-border-2 hover:border-accent/30 px-3.5 py-1.5 rounded-lg"
              >
                My Trips
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs font-mono bg-accent text-background font-semibold px-3.5 py-1.5 rounded-lg hover:bg-accent-dim transition"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-5 text-center">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 text-accent text-xs font-mono px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          AI-powered itinerary builder
        </div>

        <h1 className="font-display font-black text-5xl md:text-7xl text-primary leading-[0.95] tracking-tighter mb-6">
          Plan your trip.<br />
          <span className="text-accent">In seconds.</span>
        </h1>

        <p className="text-secondary text-lg max-w-md mx-auto mb-10 leading-relaxed">
          Tell us where you want to go. We'll build a day-by-day itinerary with maps, costs, and insider tips.
        </p>

        {/* Destination tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-14">
          {SUPPORTED_DESTINATIONS.map(dest => (
            <span key={dest} className="text-xs font-mono text-secondary border border-border-2 px-3 py-1 rounded-full">
              {dest}
            </span>
          ))}
        </div>

        {/* Features row */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16">
          {[
            { icon: Map,      label: 'Interactive maps',   desc: 'Every stop pinned' },
            { icon: Zap,      label: 'Instant results',    desc: 'Ready in seconds'  },
            { icon: Bookmark, label: 'Save & revisit',     desc: 'Sign in to keep'   },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-surface border border-border rounded-2xl p-4 text-left">
              <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/10 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-accent" />
              </div>
              <div className="text-xs font-semibold text-primary mb-0.5">{label}</div>
              <div className="text-[11px] text-secondary font-mono">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Planner */}
      <section id="plan" className="pb-24 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-2xl text-primary mb-2">Where are you going?</h2>
            <p className="text-secondary text-sm font-mono">Fill in the details — your itinerary appears below</p>
          </div>
          <PlannerSection user={user} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-5 py-8 text-center">
        <p className="text-muted text-xs font-mono">
          Built by <a href="https://portfolio-ykessel.vercel.app" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition">Yan Kessel</a>
          {' · '}
          <a href="https://github.com/ykessel" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition">GitHub</a>
        </p>
      </footer>
    </main>
  )
}
