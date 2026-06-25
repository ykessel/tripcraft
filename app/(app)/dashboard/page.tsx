import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getTrips } from '@/actions/trips'
import { signOut } from '@/actions/auth'
import { Globe, Plus, Calendar, MapPin } from 'lucide-react'
import type { Trip } from '@/types'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const trips = await getTrips() as Trip[]

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/80">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="font-display font-bold text-sm text-primary tracking-tight">Tripcraft</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-secondary hidden sm:block">{user.email}</span>
            <form action={signOut}>
              <button className="text-xs font-mono text-secondary hover:text-primary border border-border-2 hover:border-border px-3 py-1.5 rounded-lg transition">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display font-black text-3xl text-primary mb-1">My Trips</h1>
            <p className="text-secondary text-sm font-mono">{trips.length} saved {trips.length === 1 ? 'itinerary' : 'itineraries'}</p>
          </div>
          <Link
            href="/#plan"
            className="flex items-center gap-2 bg-accent text-background font-bold text-sm px-4 py-2.5 rounded-xl hover:bg-accent-dim transition"
          >
            <Plus className="w-4 h-4" /> New trip
          </Link>
        </div>

        {/* Trips grid */}
        {trips.length === 0 ? (
          <div className="text-center py-24 border border-border rounded-2xl">
            <div className="text-5xl mb-4">🗺️</div>
            <h2 className="font-display font-bold text-xl text-primary mb-2">No saved trips yet</h2>
            <p className="text-secondary text-sm mb-6">Plan a trip and save it to see it here</p>
            <Link
              href="/#plan"
              className="inline-flex items-center gap-2 bg-accent text-background font-bold text-sm px-5 py-3 rounded-xl hover:bg-accent-dim transition"
            >
              <Plus className="w-4 h-4" /> Plan your first trip
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map(trip => (
              <Link
                key={trip.id}
                href={`/trip/${trip.id}`}
                className="group bg-surface border border-border hover:border-accent/30 rounded-2xl overflow-hidden transition"
              >
                {/* Card header */}
                <div className="h-24 bg-gradient-to-br from-surface-2 to-background flex items-center justify-center relative">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{trip.cover_emoji}</span>
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-mono text-secondary/60 border border-border px-2 py-0.5 rounded-full capitalize bg-background/50">
                      {trip.style}
                    </span>
                  </div>
                </div>
                {/* Card body */}
                <div className="p-4">
                  <h3 className="font-display font-bold text-base text-primary mb-1 group-hover:text-accent transition">
                    {trip.destination}
                    <span className="text-secondary font-normal text-sm ml-2">{trip.country}</span>
                  </h3>
                  <div className="flex items-center gap-3 text-xs font-mono text-secondary">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {trip.days} {trip.days === 1 ? 'day' : 'days'}
                    </span>
                    <span className="flex items-center gap-1 capitalize">
                      <MapPin className="w-3 h-3" /> {trip.budget_level}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted font-mono mt-2">
                    {new Date(trip.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
