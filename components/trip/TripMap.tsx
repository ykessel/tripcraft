'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import type { Activity, Coordinates } from '@/types'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!

const TYPE_COLORS: Record<string, string> = {
  attraction:     '#10D9A0',
  food:           '#f59e0b',
  transport:      '#6366f1',
  accommodation:  '#ec4899',
  nature:         '#22c55e',
  shopping:       '#a855f7',
}

interface Props {
  activities: Activity[]
  center: Coordinates
  zoom: number
  highlighted: Activity | null
}

export default function TripMap({ activities, center, zoom, highlighted }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map())

  useEffect(() => {
    if (!containerRef.current) return

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [center.lng, center.lat],
      zoom,
      attributionControl: false,
    })

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'top-right')
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      markersRef.current.clear()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Fly to new center when activities change
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // Clear old markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current.clear()

    // Add new markers
    activities.forEach((act, i) => {
      if (!act.coordinates) return
      const color = TYPE_COLORS[act.type] ?? '#10D9A0'

      const el = document.createElement('div')
      el.className = 'trip-marker'
      el.style.cssText = `
        width: 28px; height: 28px; border-radius: 50%;
        background: ${color}; color: #080D0B;
        display: flex; align-items: center; justify-content: center;
        font-size: 11px; font-weight: 800; font-family: 'JetBrains Mono', monospace;
        border: 2px solid rgba(255,255,255,0.2);
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
        cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
      `
      el.textContent = String(i + 1)

      const popup = new mapboxgl.Popup({ offset: 16, closeButton: false })
        .setHTML(`
          <div style="font-family:'JetBrains Mono',monospace; font-size:11px; padding:2px 0">
            <div style="font-weight:700; color:#EDF2EF; margin-bottom:2px">${act.name}</div>
            <div style="color:#7A9488">${act.time ?? ''} ${act.duration ? `· ${act.duration}` : ''}</div>
          </div>
        `)

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([act.coordinates.lng, act.coordinates.lat])
        .setPopup(popup)
        .addTo(map)

      markersRef.current.set(act.id, marker)
    })

    // Fit bounds to markers
    if (activities.length > 1) {
      const coords = activities.filter(a => a.coordinates).map(a => a.coordinates!)
      const bounds = coords.reduce(
        (b, c) => b.extend([c.lng, c.lat]),
        new mapboxgl.LngLatBounds([coords[0].lng, coords[0].lat], [coords[0].lng, coords[0].lat])
      )
      map.fitBounds(bounds, { padding: 60, duration: 800 })
    } else if (activities[0]?.coordinates) {
      map.flyTo({ center: [activities[0].coordinates.lng, activities[0].coordinates.lat], zoom })
    }
  }, [activities, center, zoom])

  // Highlight on hover
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement()
      const isHighlighted = highlighted?.id === id
      el.style.transform = isHighlighted ? 'scale(1.3)' : 'scale(1)'
      el.style.boxShadow = isHighlighted
        ? '0 4px 16px rgba(16,217,160,0.5)'
        : '0 2px 8px rgba(0,0,0,0.5)'
      if (isHighlighted) marker.getPopup()?.addTo(mapRef.current!)
      else marker.getPopup()?.remove()
    })
  }, [highlighted])

  return <div ref={containerRef} className="w-full h-full" />
}
