import { ArrowDownLeft, ArrowUpRight, ChevronDown, SlidersHorizontal } from 'lucide-react'
import { sparkDown, sparkUp, toPath, type Stock } from '@/lib/market-data'
import { cn } from '@/lib/utils'

export function Sparkline({ up, id }: { up: boolean; id: string }) {
  const w = 58
  const h = 22
  const line = toPath(up ? sparkUp : sparkDown, w, h)
  const color = up ? '#1fb655' : '#f0503f'
  return (
    <svg viewBox={`0 0 ${w} ${h + 6}`} className="h-7 w-[58px]" aria-hidden="true">
      <defs>
        <linearGradient id={`spark-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${w},${h + 6} L0,${h + 6} Z`} fill={`url(#spark-${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  )
}

export function Change({ up, value, className }: { up: boolean; value: string; className?: string }) {
  const Icon = up ? ArrowUpRight : ArrowDownLeft
  return (
    <span className={cn('inline-flex items-center gap-0.5 text-[10px] font-medium', up ? 'text-up' : 'text-down', className)}>
      <Icon className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
      {value}
    </span>
  )
}

export function StockRow({ stock, id }: { stock: Stock; id: string }) {
  return (
    <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-[15px] last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="truncate text-[13px] font-medium text-ink">{stock.name}</p>
        <p className="mt-1 truncate text-[10px] text-sub">{stock.sector}</p>
      </div>
      <Sparkline up={stock.up} id={id} />
      <div className="w-[92px] text-right">
        <p className="text-[13px] font-semibold text-ink">{stock.price}</p>
        <Change up={stock.up} value={stock.change} className="mt-1" />
      </div>
    </li>
  )
}

export function FilterBar() {
  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        aria-label="Filters"
        className="flex size-10 items-center justify-center rounded-xl bg-white text-ink"
      >
        <SlidersHorizontal className="size-[18px]" strokeWidth={1.8} />
      </button>
      <button
        type="button"
        className="flex h-9 items-center gap-2 rounded-xl bg-white px-3.5 text-[11px] text-sub"
      >
        Market Price
        <ChevronDown className="size-3.5 text-ink" strokeWidth={2} aria-hidden="true" />
      </button>
    </div>
  )
}
