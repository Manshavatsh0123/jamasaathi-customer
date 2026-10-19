
import { Check, Clock3, FileText, Plus, ShieldCheck } from 'lucide-react'

export function OnboardingHero() {
  return (
    <div
      className="relative h-[330px] w-full shrink-0 overflow-hidden max-[360px]:h-[268px] [@media(max-height:640px)]:h-[250px]"
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-0 h-[330px] w-[375px] origin-top -translate-x-1/2 max-[360px]:scale-[0.8] [@media(max-height:640px)]:scale-[0.76]">

      
        <div className="absolute left-[-14px] top-[96px] h-[150px] w-[180px] -rotate-[9deg] rounded-[20px] bg-[#26364d] p-4 shadow-xl">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-white/10">
              <FileText className="size-4 text-white" />
            </div>
            <p className="text-[9px] text-white/60">
              Collection Summary
            </p>
          </div>

          <p className="mt-3 text-[19px] font-semibold text-white">
            ₹21,200
          </p>
          <p className="text-[8px] text-white/60">
            Total recorded collection
          </p>

          <div className="mt-3 flex h-[35px] items-end gap-2.5">
            {[14, 24, 18, 30, 22, 34].map((h, i) => (
              <span
                key={i}
                className="w-3 rounded-t-sm bg-white/30"
                style={{ height: `${h}px` }}
              />
            ))}
          </div>
        </div>

    
        <div className="absolute right-[-22px] top-[44px] h-[132px] w-[160px] rounded-[20px] bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
          <div className="flex items-center gap-2">
            <div className="flex size-7 items-center justify-center rounded-lg bg-[#fff1f1]">
              <FileText className="size-4 text-[#c9252d]" />
            </div>
            <p className="text-[9px] font-medium text-ink">
              My Account
            </p>
          </div>

          <p className="mt-3 text-[13px] font-semibold text-ink">
            ACC-006
          </p>
          <p className="mt-1 text-[8px] text-sub">
            Monthly Collection
          </p>

          <div className="mt-3 flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#16834a]" />
            <span className="text-[8px] font-medium text-[#16834a]">
              Active Account
            </span>
          </div>
        </div>

        {/* Verified payment pill */}
        <div className="absolute left-[164px] top-[62px] flex -rotate-[14deg] items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[9px] font-medium text-ink shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <ShieldCheck
            className="size-3 text-[#c9252d]"
            strokeWidth={2}
          />
          Secure Records
        </div>

      
        <div className="absolute left-[208px] top-[114px] z-20 flex size-9 items-center justify-center rounded-full bg-[#c9252d] text-white shadow-[0_6px_16px_rgba(201,37,45,0.3)]">
          <Check className="size-4" strokeWidth={2.5} />
        </div>

  
        <div className="absolute left-[156px] top-[146px] z-10 h-[124px] w-[160px] rounded-[18px] bg-[#c9252d] p-3.5 text-white shadow-[0_14px_30px_rgba(201,37,45,0.25)]">
          <div className="flex items-center justify-between">
            <p className="text-[9px] font-medium text-white/80">
              Payment Record
            </p>
            <div className="flex size-7 items-center justify-center rounded-lg bg-white/15">
              <Check className="size-4" />
            </div>
          </div>

          <p className="mt-3 text-[7px] text-white/70">
            Recorded Payment
          </p>
          <p className="text-[21px] font-semibold tracking-tight">
            ₹1,100
          </p>

          <div className="mt-2 flex items-center gap-1.5">
            <Check className="size-3" />
            <p className="text-[8px] font-medium">
              Payment Approved
            </p>
          </div>
        </div>

        {/* Pending payment pill */}
        <div className="absolute left-[244px] top-[252px] z-20 flex rotate-[22deg] items-center gap-1 rounded-full bg-white px-4 py-2.5 text-[9px] font-medium text-ink shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <Clock3
            className="size-3 text-[#c9252d]"
            strokeWidth={2.5}
          />
          Payment Status
        </div>
      </div>
    </div>
  )
}