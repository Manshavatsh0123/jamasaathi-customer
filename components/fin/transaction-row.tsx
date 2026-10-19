import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import type { transactions } from '@/lib/market-data'
import { cn } from '@/lib/utils'

type Transaction = (typeof transactions)[number]

export function TransactionRow({ type, title, date, amount, status }: Transaction) {
  const Icon = type === 'out' ? ArrowUpRight : ArrowDownLeft
  return (
    <li className="flex items-center gap-3 border-b border-[#f0f0f0] py-3 last:border-b-0">
      <span className="flex size-9 items-center justify-center rounded-full border border-[#ececec] text-ink">
        <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-medium text-ink">{title}</p>
        <p className="mt-0.5 text-[7px] text-sub">{date}</p>
      </div>
      <div className="text-right">
        <p className="text-[11px] font-semibold text-ink">{amount}</p>
        <p className={cn('mt-0.5 text-[7px]', status === 'Success' ? 'text-up' : 'text-down')}>{status}</p>
      </div>
    </li>
  )
}
