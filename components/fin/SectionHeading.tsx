import { UserRound } from "lucide-react"

export default function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof UserRound
  title: string
  description: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--hs-primary)]">
        <Icon size={18} strokeWidth={1.8} />
      </div>

      <div className="min-w-0">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        <p className="mt-0.5 text-[10px] leading-4 text-sub">
          {description}
        </p>
      </div>
    </div>
  )
}