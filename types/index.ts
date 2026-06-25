export type ActivityType = 'attraction' | 'food' | 'transport' | 'accommodation' | 'nature' | 'shopping'

export type TripStyle = 'cultural' | 'adventure' | 'relaxation' | 'foodie' | 'budget'

export interface Coordinates {
  lng: number
  lat: number
}

export interface Activity {
  id: string
  time: string
  name: string
  description: string
  type: ActivityType
  coordinates: Coordinates
  estimatedCost: number
  currency: string
  duration?: string
  tips?: string
}

export interface Day {
  day: number
  title: string
  theme: string
  activities: Activity[]
  totalCost: number
}

export interface Itinerary {
  destination: string
  country: string
  days: Day[]
  totalBudget: number
  currency: string
  style: TripStyle
  centerCoordinates: Coordinates
  zoom: number
  highlights: string[]
  bestTimeToVisit: string
  timezone: string
}

export interface TripInput {
  destination: string
  days: number
  budget: 'budget' | 'moderate' | 'luxury'
  style: TripStyle
}

export interface Profile {
  id: string
  name: string | null
  avatar_url: string | null
  created_at: string
}

export interface Trip {
  id: string
  user_id: string
  destination: string
  country: string
  days: number
  style: TripStyle
  budget_level: string
  itinerary: Itinerary
  cover_emoji: string
  created_at: string
  updated_at: string
}
