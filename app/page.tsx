'use client'

import { useState, useEffect } from 'react'
import PricesList from '@/components/PricesList'

/* ================= CONSTANTS ================= */

const WHATSAPP_NUMBER = '32488383871'
// Openingsuren
const OPEN_DAYS = [2, 3, 4, 5, 6] // di → za
const OPEN_HOUR = 9
const CLOSE_HOUR = 19

// Belgische feestdagen 2026
const HOLIDAYS_2026 = [
  '2026-01-01',
  '2026-04-06',
  '2026-05-01',
  '2026-05-14',
  '2026-05-25',
  '2026-07-21',
  '2026-08-15',
  '2026-11-01',
  '2026-11-11',
  '2026-12-25',
]

/* ================= HELPERS ================= */

function getStatus(now: Date) {
  const day = now.getDay()
  const hour = now.getHours()
  const minutes = now.getMinutes()
  const time = hour + minutes / 60
  const dateKey = now.toISOString().slice(0, 10)

  if (HOLIDAYS_2026.includes(dateKey)) {
    return { label: 'Gesloten', wait: null }
  }

  if (!OPEN_DAYS.includes(day)) {
    return { label: 'Gesloten', wait: null }
  }

  if (time < OPEN_HOUR || time >= CLOSE_HOUR) {
    return { label: 'Gesloten', wait: null }
  }

  if (day === 6) {
    return { label: 'Zeer druk', wait: '+60 min' }
  }

  if ((day === 3 || day === 5) && time >= 14) {
    return { label: 'Zeer druk', wait: '+60 min' }
  }

  return { label: 'Rustig', wait: '±15 min' }
}

/* ================= PAGE ================= */

export default function Page() {
  const [status, setStatus] = useState(() => getStatus(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus(new Date()))
    }, 60_000)

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative min-h-[100svh] w-full overflow-hidden bg-black">
        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video/hero-alt-bg.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* HERO CONTENT */}
        <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-start px-4 pt-[18svh] text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-semibold tracking-wide text-white">
              Barber Sener
            </h1>

            {/* STATUS BADGE */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white backdrop-blur">
              <span
                className={`h-2 w-2 rounded-full ${
                  status.label === 'Gesloten'
                    ? 'bg-gray-400'
                    : status.label === 'Zeer druk'
                    ? 'bg-red-500'
                    : 'bg-green-400'
                }`}
              />
              {status.label}
              {status.wait && ` – ${status.wait}`}
            </div>

            {/* WHATSAPP CTA */}
            <p className="mt-4 text-sm text-white/80">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                  'Hoe lang is de wachttijd aub?'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-green-400 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4 text-green-400"
                >
                  <path d="M12.04 0C5.39 0 .04 5.35.04 12c0 2.11.55 4.17 1.6 5.99L0 24l6.24-1.64A11.9 11.9 0 0 0 12.04 24C18.66 24 24 18.66 24 12S18.66 0 12.04 0z" />
                </svg>
                <span>Check drukte</span>
              </a>
              <br />
              Di – Za · 09u – 19u
              <br />
              Ma &amp; Zo gesloten
            </p>
          </div>
        </div>

        {/* ================= PRICE PICKER ================= */}
        <div
          className="absolute left-0 right-0 z-20 px-4"
          style={{ bottom: '8svh' }}
        >
          <PricesList />
        </div>
      </section>
    </>
  )
}
