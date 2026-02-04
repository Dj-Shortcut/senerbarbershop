'use client'

import { useRef, useState } from 'react'

const items = [
  { label: 'Knippen', price: 20 },
  { label: 'Knippen & Baard', price: 30 },
  { label: 'Alleen tondeuse', price: 15 },
  { label: 'Harsen (hete wax)', price: 5 },
  { label: 'Haar wassen', price: 5 },
  { label: 'Onder 10 jaar', price: 15 },
]

export default function PricesList() {
  const listRef = useRef<HTMLUListElement>(null)
  const [activeIndex, setActiveIndex] = useState(1)

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
  )
}
