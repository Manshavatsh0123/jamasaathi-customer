import { cn } from '@/lib/utils'

export function UsFlag({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={cn('size-5', className)} aria-hidden="true">
      <defs>
        <clipPath id="flag-clip">
          <circle cx="10" cy="10" r="10" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-clip)">
        <rect width="20" height="20" fill="#fff" />
        {[0, 2, 4, 6, 8, 10].map((i) => (
          <rect key={i} y={i * 3 + 0.2} width="20" height="1.6" fill="#d22f27" />
        ))}
        <rect width="10" height="10" fill="#1e3a8a" />
        {[2.5, 5, 7.5].flatMap((y) => [2.5, 5, 7.5].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.6" fill="#fff" />))}
      </g>
    </svg>
  )
}

export function UsdPill({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full bg-white py-0.5 pl-0.5 pr-2 text-[9px] font-semibold text-ink', className)}>
      <UsFlag className="size-4" />
      USD
    </span>
  )
}
