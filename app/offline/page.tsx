'use client'

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 text-center">
      <div>
        <div className="text-6xl mb-6">✈️</div>
        <h1 className="font-display font-black text-3xl text-primary mb-3">You're offline</h1>
        <p className="text-secondary text-sm max-w-xs mx-auto mb-8 leading-relaxed">
          No internet connection detected. Connect and we'll take you right back to planning.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-accent text-background font-bold text-sm px-6 py-3 rounded-xl hover:bg-accent-dim transition"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
