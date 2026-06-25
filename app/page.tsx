import { createClient } from '@/lib/supabase/server'
import HomeClient from '@/components/sections/HomeClient'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return <HomeClient user={user} />
}
