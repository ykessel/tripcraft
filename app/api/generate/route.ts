import { NextRequest, NextResponse } from 'next/server'
import { generateItinerary, SUPPORTED_DESTINATIONS } from '@/lib/mock-itineraries'
import type { TripInput } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const body: TripInput = await req.json()

    if (!body.destination?.trim()) {
      return NextResponse.json({ error: 'Destination is required' }, { status: 400 })
    }

    // Simulate AI "thinking" time for UX
    await new Promise(r => setTimeout(r, 1200))

    const result = generateItinerary(body)

    if (!result) {
      return NextResponse.json(
        {
          error: `We don't have data for "${body.destination}" yet.`,
          supported: SUPPORTED_DESTINATIONS,
        },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 })
  }
}
