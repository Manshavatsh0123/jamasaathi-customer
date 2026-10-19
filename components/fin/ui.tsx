import { ChevronRight, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Card({ as: Tag = 'div', className, ...props }: React.HTMLAttributes<HTMLElement> & { as?: 'div' | 'section' | 'ul' }) {
  return <Tag className={cn('rounded-[14px] bg-white', className)} {...props} />
}

export function Watermark({ children, className }: { children: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute left-1/2 top-3 -translate-x-1/2 select-none whitespace-nowrap text-[92px] font-bold leading-none tracking-tight text-black/[0.035]',
        className,
      )}
    >
      {children}
    </span>
  )
}

export function SettingsRow({
  icon: Icon,
  label,
  iconClassName = 'text-[#ff5a1f]',
  trailing,
  chevron = true,
}: {
  icon: LucideIcon
  label: string
  iconClassName?: string
  trailing?: React.ReactNode
  chevron?: boolean
}) {
  return (
    <>
      <Icon className={cn('size-3.5', iconClassName)} strokeWidth={1.8} aria-hidden="true" />
      <span className="flex-1 text-[10px] text-ink">{label}</span>
      {trailing}
      {chevron ? <ChevronRight className="size-3 text-ink" aria-hidden="true" /> : null}
    </>
  )
}

export const rowClass = 'flex w-full items-center gap-2.5 py-3.5 text-left'
export const dividerClass = 'border-b border-[#f2f2f2] last:border-b-0'
