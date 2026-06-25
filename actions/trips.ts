'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Itinerary, TripStyle } from '@/types'

export async function saveTrip(data: {
  destination: string
  country: string
  days: number
  style: TripStyle
  budgetLevel: string
  itinerary: Itinerary
  coverEmoji: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: trip, error } = await supabase.rpc('save_trip', {
    p_destination:  data.destination,
    p_country:      data.country,
    p_days:         data.days,
    p_style:        data.style,
    p_budget_level: data.budgetLevel,
    p_itinerary:    data.itinerary as unknown as Record<string, unknown>,
    p_cover_emoji:  data.coverEmoji,
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { trip }
}

export async function deleteTrip(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('trips').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function getTrips() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []
  const { data } = await supabase
    .from('trips')
    .select('*')
    .order('created_at', { ascending: false })
  return data ?? []
}

export async function getTrip(id: string) {
  const supabase = await createClient()
  const { data } = await supabase.from('trips').select('*').eq('id', id).single()
  return data
}
