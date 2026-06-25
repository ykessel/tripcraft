'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ItineraryView from './ItineraryView'
import { deleteTrip } from '@/actions/trips'
import type { Trip, Itinerary, TripInput } from '@/types'
import type { User } from '@supabase/supabase-js'
import { Trash2 } from 'lucide-react'

interface Props {
  trip: Trip
  user: User
}

export default function TripDetailClient({ trip, user }: Props) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const itinerary = trip.itinerary as unknown as Itinerary
  const input: TripInput = {
    destination: trip.destination,
    days: trip.days,
    budget: trip.budget_level as TripInput['budget'],
    style: trip.style as TripInput['style'],
  }

  async function handleDelete() {
    if (!confirm('Delete this trip? This cannot be undone.')) return
    setDeleting(true)
    const result = await deleteTrip(trip.id)
    if (result.error) { alert(result.error); setDeleting(false) }
    else router.push('/dashboard')
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-2 text-xs font-mono text-red-400/70 hover:text-red-400 border border-red-400/20 hover:border-red-400/40 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {deleting ? 'Deleting…' : 'Delete trip'}
        </button>
      </div>
      <ItineraryView
        itinerary={itinerary}
        emoji={trip.cover_emoji}
        input={input}
        user={user}
        onReset={() => router.push('/dashboard')}
      />
    </div>
  )
}
