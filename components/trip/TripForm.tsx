'use client'

import { useState } from 'react'
import { Loader2, MapPin, Calendar, Wallet, Compass } from 'lucide-react'
import type { TripInput, TripStyle } from '@/types'
import { SUPPORTED_DESTINATIONS } from '@/lib/mock-itineraries'

const STYLES: { value: TripStyle; label: string; emoji: string }[] = [
  { value: 'cultural',    label: 'Cultural',    emoji: '🏛️' },
  { value: 'adventure',   label: 'Adventure',   emoji: '🧗' },
  { value: 'relaxation',  label: 'Relaxation',  emoji: '🌿' },
  { value: 'foodie',      label: 'Foodie',      emoji: '🍜' },
  { value: 'budget',      label: 'Budget',      emoji: '💸' },
]

const BUDGETS: { value: TripInput['budget']; label: string; desc: string }[] = [
  { value: 'budget',   label: 'Budget',   desc: 'Hostels, street food, free sights' },
  { value: 'moderate', label: 'Moderate', desc: 'Hotels, local restaurants, paid attractions' },
  { value: 'luxury',   label: 'Luxury',   desc: 'Fine dining, boutique hotels, private tours' },
]

interface Props {
  onResult: (data: { itinerary: unknown; emoji: string; input: TripInput }) => void
}

export default function TripForm({ onResult }: Props) {
  const [destination, setDestination] = useState('')
  const [days, setDays] = useState(3)
  const [budget, setBudget] = useState<TripInput['budget']>('moderate')
  const [style, setStyle] = useState<TripStyle>('cultural')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!destination.trim()) return
    setLoading(true)
    setError(null)

    const input: TripInput = { destination: destination.trim(), days, budget, style }

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong')
      } else {
        onResult({ itinerary: data.itinerary, emoji: data.emoji, input })
      }
    } catch {
      setError('Network error — please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto space-y-5">
      {/* Destination */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <MapPin className="w-3 h-3" /> Destination
        </label>
        <input
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Paris, Tokyo, New York…"
          className="w-full bg-surface border border-border-2 focus:border-accent/50 rounded-xl px-4 py-3 text-primary placeholder:text-muted text-sm outline-none transition"
          list="destination-hints"
          required
        />
        <datalist id="destination-hints">
          {SUPPORTED_DESTINATIONS.map(d => <option key={d} value={d} />)}
        </datalist>
      </div>

      {/* Days */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <Calendar className="w-3 h-3" /> Duration — <span className="text-accent">{days} {days === 1 ? 'day' : 'days'}</span>
        </label>
        <input
          type="range"
          min={1}
          max={7}
          value={days}
          onChange={e => setDays(Number(e.target.value))}
          className="w-full accent-[#10D9A0] cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted font-mono">
          {[1,2,3,4,5,6,7].map(d => <span key={d}>{d}d</span>)}
        </div>
      </div>

      {/* Style */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <Compass className="w-3 h-3" /> Travel Style
        </label>
        <div className="grid grid-cols-5 gap-2">
          {STYLES.map(s => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStyle(s.value)}
              className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs transition
                ${style === s.value
                  ? 'bg-accent/10 border-accent/40 text-accent'
                  : 'bg-surface border-border-2 text-secondary hover:border-accent/20 hover:text-primary'
                }`}
            >
              <span className="text-lg">{s.emoji}</span>
              <span className="font-mono">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="space-y-1.5">
        <label className="text-xs font-mono text-secondary uppercase tracking-widest flex items-center gap-1.5">
          <Wallet className="w-3 h-3" /> Budget Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {BUDGETS.map(b => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBudget(b.value)}
              className={`flex flex-col items-start gap-0.5 px-3.5 py-3 rounded-xl border text-left transition
                ${budget === b.value
                  ? 'bg-accent/10 border-accent/40'
                  : 'bg-surface border-border-2 hover:border-accent/20'
                }`}
            >
              <span className={`text-sm font-semibold ${budget === b.value ? 'text-accent' : 'text-primary'}`}>{b.label}</span>
              <span className="text-[10px] text-secondary leading-tight">{b.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
          {error}
          {error.includes("don't have data") && (
            <p className="mt-1 text-red-400/70 text-xs">
              Try: {SUPPORTED_DESTINATIONS.join(', ')}
            </p>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !destination.trim()}
        className="w-full flex items-center justify-center gap-2.5 bg-accent text-background font-bold py-4 rounded-xl text-sm hover:bg-accent-dim disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Crafting your itinerary…</>
        ) : (
          '✦ Plan my trip'
        )}
      </button>
    </form>
  )
}
