import { Phone } from "lucide-react"

export default function ProfileDetail({
  label,
  value,
  icon: Icon,
}: {
  label: string
  value: string
  icon: typeof Phone
}) {
  return (
    <div className="flex min-w-0 items-start gap-2.5 py-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#fff1f1] text-[var(--hs-primary)]">
        <Icon size={15} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-[10px] leading-4 text-sub">{label}</p>
        <p className="mt-1 break-words text-xs font-medium leading-5 text-ink">
          {value}
        </p>
      </div>
    </div>
  )
}