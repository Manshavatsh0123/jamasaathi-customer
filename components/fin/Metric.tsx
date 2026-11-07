import { cn } from "@/lib/utils"
import { ShieldCheck, Wallet } from "lucide-react"

export default 
function Metric({
  label,
  value,
  description,
  icon: Icon,
  featured = false,
}: {
  label: string
  value: string
  description: string
  icon: typeof Wallet
  featured?: boolean
}) {
  return (
    <div
      className={cn(
        'relative min-w-0 overflow-hidden rounded-2xl border p-4 sm:p-5',
        featured
          ? 'border-transparent bg-[var(--hs-primary)] text-white shadow-[0_8px_24px_rgba(201,37,45,0.14)]'
          : 'border-gray-100 bg-white text-ink shadow-[0_5px_20px_rgba(38,54,77,0.035)]',
      )}
    >
      {featured && (
        <div className="pointer-events-none absolute -right-7 -top-8 size-24 rounded-full border-[16px] border-white/10" />
      )}

      <div className="relative flex items-center justify-between gap-2">
        <span
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-xl',
            featured
              ? 'bg-white/15 text-white'
              : 'bg-[#fff1f1] text-[var(--hs-primary)]',
          )}
        >
          <Icon size={18} strokeWidth={1.8} />
        </span>

        {featured && (
          <ShieldCheck
            className="size-[17px] text-white/70"
            strokeWidth={1.7}
          />
        )}
      </div>

      <p
        className={cn(
          'relative mt-4 text-[11px] leading-5',
          featured ? 'text-white/80' : 'text-sub',
        )}
      >
        {label}
      </p>

      <p
        className={cn(
          'relative mt-1 break-words text-xl font-bold tracking-tight sm:text-2xl',
          featured ? 'text-white' : 'text-ink',
        )}
      >
        {value}
      </p>

      <p
        className={cn(
          'relative mt-1.5 text-[10px] leading-4',
          featured ? 'text-white/75' : 'text-sub',
        )}
      >
        {description}
      </p>
    </div>
  )
}