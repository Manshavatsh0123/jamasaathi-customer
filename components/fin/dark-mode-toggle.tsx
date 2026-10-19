'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function DarkModeToggle() {
  const [on, setOn] = useState(false)
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label="Dark mode"
      onClick={() => setOn((v) => !v)}
      className={cn('relative h-4 w-7 rounded-full transition-colors', on ? 'bg-ink' : 'bg-[#ececec]')}
    >
      <span
        className={cn(
          'absolute top-0.5 size-3 rounded-full bg-white shadow transition-transform',
          on ? 'translate-x-3.5' : 'translate-x-0.5',
        )}
      />
    </button>
  )
}
