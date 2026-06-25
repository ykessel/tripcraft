'use client'

import Link from 'next/link'
import ThemeToggle from '@/components/ui/ThemeToggle'
import PlannerSection from '@/components/trip/PlannerSection'
import type { User } from '@supabase/supabase-js'
import { SUPPORTED_DESTINATIONS } from '@/lib/mock-itineraries'

const c = (v: string) => `var(--${v})`

const FEATURES = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/>
      </svg>
    ),
    label: 'Interactive maps',
    desc: 'Every stop pinned',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z"/>
      </svg>
    ),
    label: 'Instant results',
    desc: 'Ready in seconds',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
      </svg>
    ),
    label: 'Save & revisit',
    desc: 'Sign in to keep',
  },
]

const STEPS = [
  {
    n: '01',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/>
      </svg>
    ),
    title: 'Tell us where',
    body: 'Pick a destination, trip length, travel style, and budget. No account needed to start.',
  },
  {
    n: '02',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.6 4.8L18.5 9.4 13.6 11 12 16l-1.6-5L5.5 9.4l4.9-1.6z"/>
        <path d="M19 4v3M20.5 5.5h-3"/>
      </svg>
    ),
    title: 'AI builds your plan',
    body: 'Our model drafts a day-by-day itinerary with timings, costs, and local tips in seconds.',
  },
  {
    n: '03',
    icon: (
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v14"/><path d="M15 6v14"/>
        <path d="m14.5 13 1.6 1.6 3-3"/>
      </svg>
    ),
    title: 'Explore & save',
    body: 'See every stop on the map, tweak what you like, and sign in to keep it for the road.',
  },
]

interface Props { user: User | null }

export default function HomeClient({ user }: Props) {
  return (
    <div style={{ minHeight: '100vh', color: c('primary'), fontFamily: 'var(--font-archivo), system-ui, sans-serif' }}>

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="tx" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        borderBottom: `1px solid ${c('border')}`,
        backdropFilter: 'blur(18px)',
        background: c('nav-bg'),
      }}>
        <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px', height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <span className="tx" style={{ width: 30, height: 30, borderRadius: 9, background: c('accent-soft'), border: `1px solid ${c('accent-line')}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c('accent') }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a13 13 0 0 1 0 18 13 13 0 0 1 0-18z"/>
              </svg>
            </span>
            <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-.02em', color: c('primary') }}>Tripcraft</span>
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ThemeToggle />
            {user ? (
              <Link href="/dashboard" style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12, fontWeight: 600,
                background: c('accent'), color: c('bg-solid'),
                padding: '8px 15px', borderRadius: 9, textDecoration: 'none',
              }}>
                My Trips
              </Link>
            ) : (
              <a href="/login" className="tx" style={{
                fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12, fontWeight: 600,
                background: c('accent'), color: c('bg-solid'),
                padding: '8px 15px', borderRadius: 9, textDecoration: 'none',
                transition: 'background .2s',
              }}>
                Sign in
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="top" style={{ padding: '140px 24px 84px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        {/* Pulse badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: c('accent-soft'), border: `1px solid ${c('accent-line')}`,
          color: c('accent'),
          fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12,
          padding: '6px 13px', borderRadius: 999, marginBottom: 30,
        }}>
          <span className="animate-pulse-dot" style={{ width: 6, height: 6, background: c('accent'), borderRadius: '50%' }} />
          AI-powered itinerary builder
        </div>

        <h1 style={{
          fontWeight: 900,
          fontSize: 'clamp(48px, 8vw, 84px)',
          lineHeight: .94,
          letterSpacing: '-.045em',
          color: c('primary'),
          marginBottom: 22,
        }}>
          Plan your trip.<br />
          <span style={{ color: c('accent') }}>In seconds.</span>
        </h1>

        <p style={{ color: c('secondary'), fontSize: 19, lineHeight: 1.55, maxWidth: 440, margin: '0 auto 32px' }}>
          Tell us where you want to go. We'll build a day-by-day itinerary with maps, costs, and insider tips.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          <a href="#plan" className="tx" style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            background: c('accent'), color: c('bg-solid'),
            fontWeight: 700, fontSize: 15, padding: '13px 24px', borderRadius: 11, textDecoration: 'none',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.6 4.8L18.5 9.4 13.6 11 12 16l-1.6-5L5.5 9.4l4.9-1.6z"/>
            </svg>
            Plan my trip
          </a>
          <a href="#how" className="tx" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: c('primary'),
            fontWeight: 600, fontSize: 15, padding: '13px 22px', borderRadius: 11,
            textDecoration: 'none', border: `1px solid ${c('border2')}`,
          }}>
            See how it works
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
            </svg>
          </a>
        </div>

        {/* Destination pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 11, color: c('muted'), textTransform: 'uppercase', letterSpacing: '.12em', marginRight: 4 }}>Popular</span>
          {SUPPORTED_DESTINATIONS.map(dest => (
            <a key={dest} href="#plan" className="tx" style={{
              fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12,
              color: c('secondary'), background: c('surface'),
              border: `1px solid ${c('border2')}`,
              padding: '6px 13px', borderRadius: 999,
              textDecoration: 'none', cursor: 'pointer',
            }}>
              {dest}
            </a>
          ))}
        </div>
      </section>

      {/* ── FEATURE STRIP ────────────────────────────────────── */}
      <section style={{ padding: '0 24px 88px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {FEATURES.map(f => (
            <div key={f.label} className="tx" style={{
              background: c('surface'), border: `1px solid ${c('border')}`,
              borderRadius: 18, padding: 22, textAlign: 'left',
              boxShadow: c('shadow'),
            }}>
              <span className="tx" style={{
                width: 38, height: 38, borderRadius: 11,
                background: c('accent-soft'), border: `1px solid ${c('accent-line')}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c('accent'), marginBottom: 16,
              }}>
                {f.icon}
              </span>
              <div style={{ fontWeight: 700, fontSize: 15, color: c('primary'), marginBottom: 4 }}>{f.label}</div>
              <div style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12, color: c('secondary') }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section id="how" style={{ padding: '24px 24px 96px', maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12, color: c('accent'), textTransform: 'uppercase', letterSpacing: '.16em' }}>How it works</span>
          <h2 style={{ fontWeight: 800, fontSize: 34, letterSpacing: '-.03em', color: c('primary'), marginTop: 12 }}>Three steps to a full plan</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {STEPS.map(s => (
            <div key={s.n} className="tx" style={{
              position: 'relative',
              background: c('surface'), border: `1px solid ${c('border')}`,
              borderRadius: 20, padding: '28px 24px',
              boxShadow: c('shadow'),
            }}>
              <span style={{ position: 'absolute', top: 22, right: 24, fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 13, color: c('muted') }}>{s.n}</span>
              <span className="tx" style={{
                width: 46, height: 46, borderRadius: 13,
                background: c('accent-soft'), border: `1px solid ${c('accent-line')}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: c('accent'), marginBottom: 20,
              }}>
                {s.icon}
              </span>
              <div style={{ fontWeight: 700, fontSize: 17, color: c('primary'), marginBottom: 8 }}>{s.title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: c('secondary') }}>{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PLANNER ──────────────────────────────────────────── */}
      <section id="plan" style={{ padding: '24px 24px 96px', maxWidth: 680, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontWeight: 800, fontSize: 32, letterSpacing: '-.03em', color: c('primary'), marginBottom: 8 }}>Where are you going?</h2>
          <p style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 13, color: c('secondary') }}>Fill in the details — your itinerary appears below</p>
        </div>
        <PlannerSection user={user} />
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="tx" style={{ borderTop: `1px solid ${c('border')}`, padding: '30px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-jetbrains-mono), monospace', fontSize: 12, color: c('muted') }}>
          Built by{' '}
          <a href="https://portfolio-ykessel.vercel.app" target="_blank" rel="noopener noreferrer" style={{ color: c('secondary'), textDecoration: 'none' }}>Yan Kessel</a>
          {' · '}
          <a href="https://github.com/ykessel" target="_blank" rel="noopener noreferrer" style={{ color: c('secondary'), textDecoration: 'none' }}>GitHub</a>
        </p>
      </footer>
    </div>
  )
}
