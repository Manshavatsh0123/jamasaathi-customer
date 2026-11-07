import { UserRound } from "lucide-react"

export default function DetailRow({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string | null | undefined
  icon?: typeof UserRound
}) {
  return (
    <div className="flex min-w-0 items-center gap-3 border-b border-gray-100/80 py-3 last:border-0">
      {Icon && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--hs-primary)]">
          <Icon size={16} strokeWidth={1.8} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-sub">{label}</p>
        <p className="mt-1 break-words text-[13px] font-medium text-ink">
          {value || 'Not provided'}
        </p>
      </div>
    </div>
  )
}