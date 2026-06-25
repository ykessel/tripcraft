'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ArrowLeft, Bookmark, CheckCircle, Clock, MapPin, DollarSign, Lightbulb } from 'lucide-react'
import type { Itinerary, TripInput, Activity } from '@/types'
import type { User } from '@supabase/supabase-js'
import { saveTrip } from '@/actions/trips'

const TripMap = dynamic(() => import('./TripMap'), { ssr: false })

const TYPE_COLORS: Record<string, string> = {
  attraction:     '#10D9A0',
  food:           '#f59e0b',
  transport:      '#6366f1',
  accommodation:  '#ec4899',
  nature:         '#22c55e',
  shopping:       '#a855f7',
}

const TYPE_EMOJI: Record<string, string> = {
  attraction:     '🏛️',
  food:           '🍽️',
  transport:      '🚆',
  accommodation:  '🏨',
  nature:         '🌿',
  shopping:       '🛍️',
}

interface Props {
  itinerary: Itinerary
  emoji: string
  input: TripInput
  user: User | null
  onReset: () => void
}

export default function ItineraryView({ itinerary, emoji, input, user, onReset }: Props) {
  const [activeDay, setActiveDay] = useState(0)
  const [hoveredActivity, setHoveredActivity] = useState<Activity | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const day = itinerary.days[activeDay]

  const formatCost = useCallback((cost: number, currency: string) => {
    if (cost === 0) return 'Free'
    if (currency === 'JPY' || currency === 'COP') {
      return `${currency} ${cost.toLocaleString()}`
    }
    return `${currency} ${cost}`
  }, [])

  async function handleSave() {
    if (!user) { window.location.href = '/login'; return }
    setSaving(true)
    setSaveError(null)
    const result = await saveTrip({
      destination:  itinerary.destination,
      country:      itinerary.country,
      days:         itinerary.days.length,
      style:        input.style,
      budgetLevel:  input.budget,
      itinerary,
      coverEmoji:   emoji,
    })
    if (result.error) { setSaveError(result.error); setSaving(false) }
    else { setSaved(true); setSaving(false) }
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.4s_ease]">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <button
            onClick={onReset}
            className="mt-1 text-secondary hover:text-primary transition flex items-center gap-1.5 text-sm font-mono"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{emoji}</span>
              <h2 className="font-display font-black text-2xl text-primary">
                {itinerary.destination}
                <span className="text-secondary font-normal text-lg ml-2">{itinerary.country}</span>
              </h2>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-mono text-secondary border border-border px-2.5 py-1 rounded-full">
                {itinerary.days.length} {itinerary.days.length === 1 ? 'day' : 'days'}
              </span>
              <span className="text-xs font-mono text-secondary border border-border px-2.5 py-1 rounded-full capitalize">
                {itinerary.style}
              </span>
              <span className="text-xs font-mono text-secondary border border-border px-2.5 py-1 rounded-full capitalize">
                {input.budget}
              </span>
              <span className="text-xs font-mono text-accent border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full">
                {formatCost(itinerary.totalBudget, itinerary.currency)} est. total
              </span>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="shrink-0 text-right">
          {saved ? (
            <div className="flex items-center gap-1.5 text-accent text-sm font-mono">
              <CheckCircle className="w-4 h-4" /> Saved!
            </div>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 text-sm font-mono border border-border-2 hover:border-accent/30 px-3.5 py-2 rounded-xl text-secondary hover:text-primary transition disabled:opacity-50"
            >
              <Bookmark className="w-4 h-4" />
              {saving ? 'Saving…' : user ? 'Save trip' : 'Sign in to save'}
            </button>
          )}
          {saveError && <p className="text-red-400 text-xs mt-1">{saveError}</p>}
        </div>
      </div>

      {/* Map */}
      <div className="h-72 md:h-96 rounded-2xl overflow-hidden border border-border relative">
        <TripMap
          activities={day.activities}
          center={itinerary.centerCoordinates}
          zoom={itinerary.zoom}
          highlighted={hoveredActivity}
        />
      </div>

      {/* Day tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {itinerary.days.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className={`shrink-0 px-4 py-2 rounded-xl text-sm font-mono transition border
              ${activeDay === i
                ? 'bg-accent/10 border-accent/40 text-accent'
                : 'bg-surface border-border-2 text-secondary hover:border-accent/20 hover:text-primary'
              }`}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Day detail */}
      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-lg text-primary">{day.title}</h3>
            <p className="text-xs font-mono text-secondary">{day.theme}</p>
          </div>
          <span className="text-xs font-mono text-accent border border-accent/20 bg-accent/5 px-2.5 py-1 rounded-full">
            {formatCost(day.totalCost, itinerary.currency)}
          </span>
        </div>

        <div className="divide-y divide-border">
          {day.activities.map((act, i) => (
            <div
              key={act.id}
              onMouseEnter={() => setHoveredActivity(act)}
              onMouseLeave={() => setHoveredActivity(null)}
              className="px-5 py-4 hover:bg-background/50 transition group"
            >
              <div className="flex gap-4">
                {/* Index + time */}
                <div className="shrink-0 flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-background"
                    style={{ backgroundColor: TYPE_COLORS[act.type] ?? '#10D9A0' }}
                  >
                    {i + 1}
                  </div>
                  {i < day.activities.length - 1 && (
                    <div className="w-px flex-1 min-h-[24px] bg-border" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span>{TYPE_EMOJI[act.type]}</span>
                      <span className="font-semibold text-primary text-sm">{act.name}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {act.time && (
                        <span className="text-xs font-mono text-secondary flex items-center gap-1">
                          <Clock className="w-3 h-3" />{act.time}
                        </span>
                      )}
                      {act.duration && (
                        <span className="text-xs font-mono text-muted">{act.duration}</span>
                      )}
                    </div>
                  </div>

                  <p className="text-secondary text-sm leading-relaxed mb-2">{act.description}</p>

                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="flex items-center gap-1 text-xs font-mono text-accent">
                      <DollarSign className="w-3 h-3" />
                      {formatCost(act.estimatedCost, act.currency)}
                    </span>
                    {act.coordinates && (
                      <a
                        href={`https://www.google.com/maps?q=${act.coordinates.lat},${act.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-mono text-secondary hover:text-primary transition"
                      >
                        <MapPin className="w-3 h-3" /> View on Google Maps
                      </a>
                    )}
                  </div>

                  {act.tips && (
                    <div className="mt-2 flex items-start gap-1.5 text-xs text-secondary/80 bg-accent/5 border border-accent/10 rounded-lg px-3 py-2">
                      <Lightbulb className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                      {act.tips}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      {itinerary.highlights.length > 0 && (
        <div className="bg-surface border border-border rounded-2xl p-5">
          <h4 className="text-xs font-mono text-secondary uppercase tracking-widest mb-3">Highlights</h4>
          <div className="flex flex-wrap gap-2">
            {itinerary.highlights.map(h => (
              <span key={h} className="text-xs font-mono bg-accent/5 border border-accent/10 text-secondary px-3 py-1.5 rounded-full">
                ✦ {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-1">Best time to visit</p>
          <p className="text-sm text-primary">{itinerary.bestTimeToVisit}</p>
        </div>
        <div className="bg-surface border border-border rounded-xl p-4">
          <p className="text-xs font-mono text-secondary uppercase tracking-widest mb-1">Timezone</p>
          <p className="text-sm text-primary font-mono">{itinerary.timezone}</p>
        </div>
      </div>
    </div>
  )
}
