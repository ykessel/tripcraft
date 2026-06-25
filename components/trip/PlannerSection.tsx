'use client'

import { useState } from 'react'
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

  function handleReset() {
    setResult(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (result) {
    return (
      <ItineraryView
        itinerary={result.itinerary}
        emoji={result.emoji}
        input={result.input}
        user={user}
        onReset={handleReset}
      />
    )
  }

  return <TripForm onResult={setResult} />
}
