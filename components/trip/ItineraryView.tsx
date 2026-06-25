'use client'

import { useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { Itinerary, TripInput, Activity } from '@/types'
import type { User } from '@supabase/supabase-js'
import { saveTrip } from '@/actions/trips'

const TripMap = dynamic(() => import('./TripMap'), { ssr: false })

const c = (v: string) => `var(--${v})`

const TYPE_COLORS: Record<string, string> = {
  attraction:    '#10D9A0',
  food:          '#f59e0b',
  transport:     '#6366f1',
  accommodation: '#ec4899',
  nature:        '#22c55e',
  shopping:      '#a855f7',
}

const TYPE_EMOJI: Record<string, string> = {
  attraction:    '🏛️',
  food:          '🍽️',
  transport:     '🚆',
  accommodation: '🏨',
  nature:        '🌿',
  shopping:      '🛍️',
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
    if (currency === 'JPY' || currency === 'COP') return `${currency} ${cost.toLocaleString()}`
    return `${currency} ${cost}`
  }, [])

  async function handleSave() {
    if (!user) { window.location.href = '/login'; return }
    setSaving(true)
    setSaveError(null)
    const result = await saveTrip({
      destination: itinerary.destination,
      country: itinerary.country,
      days: itinerary.days.length,
      style: input.style,
      budgetLevel: input.budget,
      itinerary,
      coverEmoji: emoji,
    })
    if (result.error) { setSaveError(result.error); setSaving(false) }
    else { setSaved(true); setSaving(false) }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

      {/* ── Header ──────────────────────────────────────── */}
      <div className="tx" style={{
        background: c('surface'), border: `1px solid ${c('accent-line')}`,
        borderRadius: 20, padding: '20px 22px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 12, flexWrap: 'wrap',
        boxShadow: c('shadow'),
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <span style={{
            width: 34, height: 34, borderRadius: 10,
            background: c('accent-soft'), border: `1px solid ${c('accent-line')}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: c('accent'), fontSize: 18,
          }}>{emoji}</span>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18, color: c('primary'), letterSpacing: '-.02em' }}>
              {itinerary.destination}
              <span style={{ color: c('secondary'), fontWeight: 400, fontSize: 14, marginLeft: 8 }}>{itinerary.country}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('secondary'), marginTop: 2 }}>
              {itinerary.days.length} {itinerary.days.length === 1 ? 'day' : 'days'} · {input.style} · {input.budget}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11,
            color: c('accent'), background: c('accent-soft'),
            border: `1px solid ${c('accent-line')}`,
            padding: '5px 11px', borderRadius: 999,
          }}>
            {formatCost(itinerary.totalBudget, itinerary.currency)} est.
          </span>
          {saved ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: c('accent'), fontSize: 13, fontFamily: 'var(--font-jetbrains-mono), monospace' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 4 4 10-10"/></svg>
              Saved!
            </span>
          ) : (
            <button
              onClick={handleSave}
              disabled={saving}
              className="tx"
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12,
                border: `1px solid ${c('border2')}`,
                background: 'transparent', color: c('secondary'),
                padding: '7px 13px', borderRadius: 10, cursor: saving ? 'not-allowed' : 'pointer',
                opacity: saving ? .5 : 1,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>
              {saving ? 'Saving…' : user ? 'Save trip' : 'Sign in to save'}
            </button>
          )}
          <button
            onClick={onReset}
            className="tx"
            style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12,
              border: `1px solid ${c('border2')}`, background: 'transparent',
              color: c('secondary'), padding: '7px 13px', borderRadius: 10, cursor: 'pointer',
            }}
          >
            ← New trip
          </button>
        </div>
        {saveError && <p style={{ width: '100%', fontSize: 12, color: '#f87171', marginTop: 4 }}>{saveError}</p>}
      </div>

      {/* ── Map ──────────────────────────────────────────── */}
      <div style={{ height: 320, borderRadius: 18, overflow: 'hidden', border: `1px solid ${c('border')}` }}>
        <TripMap
          activities={day.activities}
          center={itinerary.centerCoordinates}
          zoom={itinerary.zoom}
          highlighted={hoveredActivity}
        />
      </div>

      {/* ── Day tabs ─────────────────────────────────────── */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
        {itinerary.days.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveDay(i)}
            className="tx"
            style={{
              flexShrink: 0, padding: '8px 16px', borderRadius: 11, cursor: 'pointer',
              fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 13,
              border: `1px solid ${i === activeDay ? c('accent') : c('border2')}`,
              background: i === activeDay ? c('accent-soft') : c('surface'),
              color: i === activeDay ? c('accent') : c('secondary'),
            }}
          >
            Day {d.day}
          </button>
        ))}
      </div>

      {/* ── Day detail ───────────────────────────────────── */}
      <div className="tx" style={{ background: c('surface'), border: `1px solid ${c('border')}`, borderRadius: 20, overflow: 'hidden', boxShadow: c('shadow') }}>
        <div style={{
          padding: '18px 22px',
          borderBottom: `1px solid ${c('border')}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, color: c('primary') }}>{day.title}</div>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('secondary'), marginTop: 2 }}>{day.theme}</div>
          </div>
          <span style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11,
            color: c('accent'), background: c('accent-soft'),
            border: `1px solid ${c('accent-line')}`,
            padding: '5px 11px', borderRadius: 999,
          }}>
            {formatCost(day.totalCost, itinerary.currency)}
          </span>
        </div>

        {day.activities.map((act, i) => (
          <div
            key={act.id}
            onMouseEnter={() => setHoveredActivity(act)}
            onMouseLeave={() => setHoveredActivity(null)}
            style={{
              padding: '16px 22px',
              borderBottom: i < day.activities.length - 1 ? `1px solid ${c('border')}` : 'none',
              display: 'flex', gap: 16,
            }}
          >
            {/* Marker + line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flexShrink: 0 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: TYPE_COLORS[act.type] ?? '#10D9A0',
                color: '#080D0B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 800,
                fontFamily: 'var(--font-jetbrains-mono), monospace',
              }}>
                {i + 1}
              </div>
              {i < day.activities.length - 1 && (
                <div style={{ width: 1, flex: 1, minHeight: 20, background: c('border') }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingBottom: 4 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{TYPE_EMOJI[act.type]}</span>
                  <span style={{ fontWeight: 600, fontSize: 14, color: c('primary') }}>{act.name}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {act.time && (
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('secondary') }}>
                      {act.time}
                    </span>
                  )}
                  {act.duration && (
                    <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('muted') }}>
                      {act.duration}
                    </span>
                  )}
                </div>
              </div>

              <p style={{ fontSize: 13, lineHeight: 1.6, color: c('secondary'), marginBottom: 8 }}>{act.description}</p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12, color: c('accent') }}>
                  {formatCost(act.estimatedCost, act.currency)}
                </span>
                {act.coordinates && (
                  <a
                    href={`https://www.google.com/maps?q=${act.coordinates.lat},${act.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('secondary'), textDecoration: 'none' }}
                  >
                    ↗ Maps
                  </a>
                )}
              </div>

              {act.tips && (
                <div style={{
                  marginTop: 8,
                  background: c('accent-soft'), border: `1px solid ${c('accent-line')}`,
                  borderRadius: 10, padding: '8px 12px',
                  fontSize: 12, color: c('secondary'), lineHeight: 1.5,
                }}>
                  💡 {act.tips}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── Highlights ───────────────────────────────────── */}
      {itinerary.highlights.length > 0 && (
        <div className="tx" style={{ background: c('surface'), border: `1px solid ${c('border')}`, borderRadius: 18, padding: 20 }}>
          <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('secondary'), textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: 12 }}>
            Highlights
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {itinerary.highlights.map(h => (
              <span key={h} style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12,
                background: c('accent-soft'), border: `1px solid ${c('accent-line')}`,
                color: c('secondary'), padding: '6px 12px', borderRadius: 999,
              }}>
                ✦ {h}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Meta ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { label: 'Best time to visit', value: itinerary.bestTimeToVisit },
          { label: 'Timezone', value: itinerary.timezone },
        ].map(m => (
          <div key={m.label} className="tx" style={{ background: c('surface'), border: `1px solid ${c('border')}`, borderRadius: 14, padding: 16 }}>
            <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 10, color: c('secondary'), textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 4 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 13, color: c('primary') }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
