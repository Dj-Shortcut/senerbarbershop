'use client'

import { useRef, useState, useEffect } from 'react'

/* ================= CONSTANTS ================= */

const WHATSAPP_NUMBER = '32488383871'
const MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=Beverstraat+22,+9400+Ninove'

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

/* ================= DATA ================= */

const items = [
  { label: 'Knippen', price: 20 },
  { label: 'Knippen & Baard', price: 30 },
  { label: 'Alleen tondeuse', price: 15 },
  { label: 'Harsen (hete wax)', price: 5 },
  { label: 'Haar wassen', price: 5 },
  { label: 'Onder 10 jaar', price: 15 },
]

/* ================= PAGE ================= */

export default function Page() {
  const listRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(1)
  const [status, setStatus] = useState(() => getStatus(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus(new Date()))
    }, 60_000)

    return () => clearInterval(interval)
  }, [])

  const handleScroll = () => {
    if (!listRef.current) return

    const rect = listRef.current.getBoundingClientRect()
    const centerY = rect.top + rect.height / 2

    let closest = 0
    let minDist = Infinity

    Array.from(listRef.current.children).forEach((child, index) => {
      const r = (child as HTMLElement).getBoundingClientRect()
      const itemCenter = r.top + r.height / 2
      const dist = Math.abs(centerY - itemCenter)

      if (dist < minDist) {
        minDist = dist
        closest = index
      }
    })

    setActiveIndex(closest)
  }

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
          <div className="mx-auto w-full max-w-xs">
            <div className="relative h-[120px] rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-9 border-y border-white/15 z-10" />
              <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-black via-transparent to-black" />

              <ul
                ref={listRef}
                onScroll={handleScroll}
                className="h-full overflow-y-scroll snap-y snap-mandatory pt-[44px] pb-[44px] space-y-6 text-sm [&::-webkit-scrollbar]:hidden"
              >
                {items.map((item, index) => (
                  <li
                    key={item.label}
                    className={`flex justify-between px-6 snap-center transition ${
                      index === activeIndex
                        ? 'text-white font-medium'
                        : 'text-white/40'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span>{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="relative bg-black py-10">
        <div className="flex justify-center gap-8">
          {/* MAPS */}
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white transition"
            aria-label="Route naar Barber Sener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
          </a>

          {/* FACEBOOK */}
          <a
            href="https://www.facebook.com/KAPSALONsener"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white transition"
            aria-label="Facebook Barber Sener"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
            </svg>
          </a>

          {/* GITHUB */}
          <a
            href="https://github.com/Dj-Shortcut/"
            target="_blank"
            rel="noreferrer"
            className="text-white/60 hover:text-white transition"
            aria-label="GitHub Dj-Shortcut"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.55-3.88-1.55-.53-1.34-1.29-1.7-1.29-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.74-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.19a11.1 11.1 0 0 1 2.9-.39c.99 0 1.99.13 2.9.39 2.21-1.5 3.18-1.19 3.18-1.19.63 1.59.23 2.76.11 3.05.74.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.08.8 2.18 0 1.57-.01 2.84-.01 3.22 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
            </svg>
          </a>
        </div>
      </footer>
    </>
  )
}
