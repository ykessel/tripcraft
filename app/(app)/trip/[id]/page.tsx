import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getTrip } from '@/actions/trips'
import TripDetailClient from '@/components/trip/TripDetailClient'
import { Globe, ArrowLeft } from 'lucide-react'
import type { Trip } from '@/types'

interface Props {
  params: Promise<{ id: string }>
}

export default async function TripDetailPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const trip = await getTrip(id) as Trip | null
  if (!trip || trip.user_id !== user.id) notFound()

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 border-b border-border/60 backdrop-blur-xl bg-background/80">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center gap-4">
          <Link href="/dashboard" className="text-secondary hover:text-primary transition flex items-center gap-1.5 text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <div className="flex items-center gap-2 ml-auto">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Globe className="w-3.5 h-3.5 text-accent" />
            </div>
            <span className="font-display font-bold text-sm text-primary tracking-tight">Tripcraft</span>
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-5 py-8">
        <TripDetailClient trip={trip} user={user} />
      </main>
    </div>
  )
}
