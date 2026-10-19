import { MobileShell } from '@/components/fin/mobile-shell'

export default function Loading() {
  return (
    <MobileShell nav className="pb-32 md:pb-12">
      <div role="status" aria-label="Loading" className="flex animate-pulse flex-col gap-3 px-4 pt-14">
        <div className="h-9 w-40 rounded-[12px] bg-white" />
        <div className="h-[200px] rounded-[18px] bg-white" />
        <div className="h-16 rounded-[14px] bg-white" />
        <div className="h-16 rounded-[14px] bg-white" />
        <div className="h-16 rounded-[14px] bg-white" />
      </div>
    </MobileShell>
  )
}
