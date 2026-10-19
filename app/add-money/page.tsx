
import Link from 'next/link'
import {
  ArrowLeft,
  ChevronRight,
  Landmark,
  ReceiptText,
  History,
} from 'lucide-react'

import { MobileShell } from '@/components/fin/mobile-shell'

const options = [
  {
    title: 'View My Accounts',
    description:
      'Check your registered accounts, deposit amount and maturity date.',
    href: '/account',
    icon: Landmark,
  },
  {
    title: 'Payment History',
    description:
      'View your recorded payments, collection dates and payment status.',
    href: '/payment',
    icon: History,
  }
]

export default function AddMoneyPage() {
  return (
    <MobileShell
      className="bg-gradient-to-b from-[#fff1f1] to-surface px-4 pb-10 pt-12 md:pt-16"
      contentClassName="md:max-w-[480px]"
    >

      <Link
        href="/home"
        aria-label="Go back to home"
        className="flex size-10 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:bg-[#fff8f8]"
      >
        <ArrowLeft className="size-[18px]" strokeWidth={1.8} />
      </Link>

      {/* Page heading */}
      <div className="mt-8 px-1">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#c9252d]">
          Jama Saathi
        </p>

        <h1 className="mt-2 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">
          Your accounts,
          <br />
          your records.
        </h1>

        <p className="mt-3 max-w-[300px] text-xs leading-5 text-sub">
          View your registered accounts, track recorded deposits and
          stay updated on your payment history.
        </p>
      </div>

      {/* Account options */}
      <ul className="mt-6 space-y-3">
        {options.map((option) => {
          const Icon = option.icon

          return (
            <li key={option.title}>
              <Link
                href={option.href}
                className="group flex items-center gap-3 rounded-2xl border border-[#f3c8ca]/70 bg-white p-4 transition hover:border-[#c9252d]/40 hover:shadow-sm active:scale-[0.99]"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#fff1f1] text-[#c9252d]">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">
                    {option.title}
                  </p>

                  <p className="mt-1 text-[10px] leading-[1.6] text-sub">
                    {option.description}
                  </p>
                </div>

                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#c9252d] text-white transition group-hover:bg-[#a91f26]">
                  <ChevronRight
                    className="size-4"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Information note */}
      <div className="mt-6 rounded-xl border border-[#e4e7eb] bg-white/80 p-4">
        <p className="text-xs font-semibold text-ink">
          Need help with your account?
        </p>

        <p className="mt-1 text-[11px] leading-5 text-sub">
          Contact your collection agent or administrator to
          confirm a deposit or correct your account records.
        </p>
      </div>
    </MobileShell>
  )
}