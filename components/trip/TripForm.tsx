'use client'

import { useState, useRef } from 'react'
import type { TripInput, TripStyle } from '@/types'
import { SUPPORTED_DESTINATIONS } from '@/lib/mock-itineraries'

const c = (v: string) => `var(--${v})`

/* ── SVG Icons ─────────────────────────────────────────────── */
const IconPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/>
  </svg>
)
const IconCal = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3.5" y="4.5" width="17" height="16" rx="2.5"/><path d="M16 3v3M8 3v3M3.5 9.5h17"/>
  </svg>
)
const IconCompass = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/><path d="M15.6 8.4 13.4 13.4 8.4 15.6 10.6 10.6z"/>
  </svg>
)
const IconWallet = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14.5" r="1.3"/>
  </svg>
)
const IconStar = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l1.6 4.8L18.5 9.4 13.6 11 12 16l-1.6-5L5.5 9.4l4.9-1.6z"/>
  </svg>
)
const IconSpinner = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="animate-spin-slow">
    <path d="M21 12a9 9 0 1 1-6.2-8.5"/>
  </svg>
)

/* ── Style buttons ─────────────────────────────────────────── */
const STYLES: { value: TripStyle; label: string; icon: React.ReactNode }[] = [
  {
    value: 'cultural', label: 'Cultural',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9 12 4l8 5"/><path d="M4 10.5h16"/><path d="M6 10.5v8M10 10.5v8M14 10.5v8M18 10.5v8"/><path d="M4 19.5h16"/></svg>,
  },
  {
    value: 'adventure', label: 'Adventure',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m4 18 5.5-10 3 5 2-3.2L20 18z"/><path d="M4 18h16"/></svg>,
  },
  {
    value: 'relaxation', label: 'Relax',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 18C5 9 12 5 20 5c0 9-6 14-14 14"/><path d="M5 18c3-5 7-7 11-8"/></svg>,
  },
  {
    value: 'foodie', label: 'Foodie',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11h16a8 8 0 0 1-16 0z"/><path d="M8 11a4 4 0 0 1 8 0"/><path d="M4 20h16"/></svg>,
  },
  {
    value: 'budget', label: 'Budget',
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12V4.5h7.5l9.5 9.5-7 7-9.5-9.5z"/><circle cx="7.5" cy="8" r="1.3"/></svg>,
  },
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
  const inputRef = useRef<HTMLInputElement>(null)

  const pct = ((days - 1) / 6) * 100
  const trackStyle = `linear-gradient(90deg, var(--accent) 0%, var(--accent) ${pct}%, var(--border2) ${pct}%, var(--border2) 100%)`

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

  const labelStyle: React.CSSProperties = {
    fontFamily: 'var(--font-jetbrains-mono), monospace',
    fontSize: 11, color: c('secondary'),
    textTransform: 'uppercase', letterSpacing: '.14em',
    display: 'flex', alignItems: 'center', gap: 7,
  }

  const selS = (v: TripStyle) => v === style
  const selB = (v: TripInput['budget']) => v === budget

  return (
    <form
      onSubmit={handleSubmit}
      className="tx"
      style={{
        background: c('surface'),
        border: `1px solid ${c('border')}`,
        borderRadius: 22,
        padding: 28,
        boxShadow: c('shadow'),
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      {/* ── Destination ──────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <label style={labelStyle}>
          <IconPin /> Destination
        </label>
        <input
          ref={inputRef}
          type="text"
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Paris, Tokyo, New York…"
          list="tc-destinations"
          required
          className="trip-input"
        />
        <datalist id="tc-destinations">
          {SUPPORTED_DESTINATIONS.map(d => <option key={d} value={d} />)}
        </datalist>
      </div>

      {/* ── Duration ─────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <label style={labelStyle}>
          <IconCal />
          Duration —{' '}
          <span style={{ color: c('accent') }}>{days} {days === 1 ? 'day' : 'days'}</span>
        </label>
        <input
          type="range"
          min={1} max={7}
          value={days}
          onChange={e => setDays(Number(e.target.value))}
          className="trip-range"
          style={{ ['--range-track' as string]: trackStyle }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('muted') }}>
          {[1,2,3,4,5,6,7].map(d => <span key={d}>{d}d</span>)}
        </div>
      </div>

      {/* ── Travel Style ─────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <label style={labelStyle}>
          <IconCompass /> Travel Style
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 9 }}>
          {STYLES.map(s => (
            <button
              key={s.value}
              type="button"
              onClick={() => setStyle(s.value)}
              className="tx"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '14px 6px', borderRadius: 13, cursor: 'pointer',
                border: `1px solid ${selS(s.value) ? c('accent') : c('border2')}`,
                background: selS(s.value) ? c('accent-soft') : c('surface'),
                color: selS(s.value) ? c('accent') : c('secondary'),
              }}
            >
              {s.icon}
              <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Budget Level ─────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <label style={labelStyle}>
          <IconWallet /> Budget Level
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 9 }}>
          {BUDGETS.map(b => (
            <button
              key={b.value}
              type="button"
              onClick={() => setBudget(b.value)}
              className="tx"
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4,
                padding: 14, borderRadius: 13, textAlign: 'left', cursor: 'pointer',
                border: `1px solid ${selB(b.value) ? c('accent') : c('border2')}`,
                background: selB(b.value) ? c('accent-soft') : c('surface'),
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 14, color: selB(b.value) ? c('accent') : c('primary') }}>
                {b.label}
              </span>
              <span style={{ fontSize: 11, lineHeight: 1.4, color: c('secondary') }}>{b.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Error ────────────────────────────────────────── */}
      {error && (
        <div style={{
          background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.2)',
          color: '#f87171', fontSize: 13, padding: '12px 16px', borderRadius: 12,
        }}>
          {error}
          {error.includes("don't have data") && (
            <p style={{ marginTop: 4, opacity: .7, fontSize: 11 }}>
              Try: {SUPPORTED_DESTINATIONS.join(', ')}
            </p>
          )}
        </div>
      )}

      {/* ── Submit ───────────────────────────────────────── */}
      <button
        type="submit"
        disabled={loading || !destination.trim()}
        className="tx"
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          background: c('accent'), color: c('bg-solid'),
          fontWeight: 800, fontSize: 15, padding: 16,
          borderRadius: 13, border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading || !destination.trim() ? .6 : 1,
        }}
      >
        {loading ? <><IconSpinner /> Crafting your itinerary…</> : <><IconStar /> Plan my trip</>}
      </button>
    </form>
  )
}
