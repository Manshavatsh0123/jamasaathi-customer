import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export type TransactionRowData = {
  type: 'in' | 'out'
  title: string
  date: string
  amount: string
  status: string
}

type TransactionRowProps = TransactionRowData & {
  onClick?: () => void
  isSelected?: boolean
}

export function TransactionRow({
  type,
  title,
  date,
  amount,
  status,
  onClick,
  isSelected = false,
}: TransactionRowProps) {
  const Icon = type === 'out' ? ArrowUpRight : ArrowDownLeft

  const isApproved = ['APPROVED', 'COMPLETED', 'SUCCESS'].includes(
    status.toUpperCase(),
  )
  const isPending = status.toUpperCase() === 'PENDING'

  const content = (
    <>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--hs-border)] text-[var(--hs-text)]">
        <Icon className="size-4" strokeWidth={1.6} aria-hidden="true" />
      </span>

      <div className="min-w-0 flex-1 text-left">
        <p className="truncate text-[11px] font-medium text-[var(--hs-text)]">
          {title}
        </p>
        <p className="mt-0.5 text-[9px] text-[var(--hs-text-secondary)]">
          {date}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-[11px] font-semibold text-[var(--hs-text)]">
          {amount}
        </p>
        <p
          className={cn(
            'mt-0.5 text-[8px] capitalize',
            isApproved
              ? 'text-[var(--hs-success)]'
              : isPending
                ? 'text-[var(--hs-warning)]'
                : 'text-[var(--hs-danger)]',
          )}
        >
          {status.replace(/_/g, ' ')}
        </p>
      </div>
    </>
  )

  if (onClick) {
    return (
      <li className="border-b border-[var(--hs-border-light)] last:border-b-0">
        <button
          type="button"
          onClick={onClick}
          aria-pressed={isSelected}
          className={cn(
            'flex w-full items-center gap-3 py-3 transition-colors hover:bg-[var(--hs-background)]',
            isSelected && 'bg-[var(--hs-primary-light)]',
          )}
        >
          {content}
        </button>
      </li>
    )
  }

  return (
    <li className="flex items-center gap-3 border-b border-[var(--hs-border-light)] py-3 last:border-b-0">
      {content}
    </li>
  )
}