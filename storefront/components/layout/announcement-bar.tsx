'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const MESSAGES = [
  'Free shipping over $50',
  'Built for the front pocket',
  '30-day returns · no questions',
  'Carry light. Live lighter.',
]

export default function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-[#0a0806] text-[#ede3cf]">
      <div className="px-4 sm:px-8 lg:px-12 py-2.5 flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.3em]">
        <span className="text-[#c93f1a] hidden sm:inline">✦</span>
        <div className="flex-1 flex items-center justify-center gap-8 lg:gap-12 overflow-hidden">
          {MESSAGES.map((m, i) => (
            <span
              key={i}
              className={`whitespace-nowrap ${i > 0 ? 'hidden md:inline' : ''} ${i > 1 ? 'lg:inline' : ''}`}
            >
              {m}
              {i < MESSAGES.length - 1 && (
                <span className="hidden md:inline ml-8 lg:ml-12 text-[#c93f1a]">·</span>
              )}
            </span>
          ))}
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="p-1 hover:text-[#c93f1a] transition-colors"
          aria-label="Dismiss announcement"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
