'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Segmented({ options, label }: { options: string[]; label: string }) {
  const [active, setActive] = useState(options[0])
  return (
    <div role="tablist" aria-label={label} className="flex rounded-[12px] bg-white p-1">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          role="tab"
          aria-selected={active === o}
          onClick={() => setActive(o)}
          className={cn(
            'rounded-[9px] px-3 py-1.5 text-[7px] font-semibold tracking-wide transition-colors',
            active === o ? 'bg-surface text-ink' : 'text-sub',
          )}
        >
          {o}
        </button>
      ))}
    </div>
  )
}
