'use client'

import { useState, useRef } from 'react'
import TripForm from './TripForm'
import ItineraryView from './ItineraryView'
import type { TripInput, Itinerary } from '@/types'
import type { User } from '@supabase/supabase-js'

interface Props {
  user: User | null
}

export default function PlannerSection({ user }: Props) {
  const [result, setResult] = useState<{
    itinerary: Itinerary
    emoji: string
    input: TripInput
  } | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  function handleResult(data: { itinerary: unknown; emoji: string; input: TripInput }) {
    setResult(data as { itinerary: Itinerary; emoji: string; input: TripInput })
    // Scroll to result after short delay for render
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
  }

  function handleReset() {
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <TripForm onResult={handleResult} />
      {result && (
        <div ref={resultRef} style={{ marginTop: 24, animation: 'riseIn .6s cubic-bezier(.2,.8,.2,1) both' }}>
          <ItineraryView
            itinerary={result.itinerary}
            emoji={result.emoji}
            input={result.input}
            user={user}
            onReset={handleReset}
          />
        </div>
      )}
    </div>
  )
}
