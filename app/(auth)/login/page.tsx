'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Globe } from 'lucide-react'

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleGitHub() {
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    })
    if (error) { setError(error.message); setLoading(false) }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
              <Globe className="w-5 h-5 text-accent" />
            </div>
            <span className="font-display font-bold text-xl text-primary tracking-tight">Tripcraft</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-primary mb-2">Welcome back</h1>
          <p className="text-secondary text-sm">Sign in to access your saved trips</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        <button
          onClick={handleGitHub}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-[#24292e] hover:bg-[#2f363d] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3.5 rounded-xl text-sm transition border border-white/10"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GitHubIcon />}
          {loading ? 'Redirecting…' : 'Continue with GitHub'}
        </button>

        <p className="text-center text-xs text-secondary/50 mt-5">
          Read-only access · No writes to your account
        </p>

        <div className="text-center mt-8">
          <a href="/" className="text-xs text-secondary hover:text-primary transition-colors font-mono">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  )
}

function GitHubIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}
