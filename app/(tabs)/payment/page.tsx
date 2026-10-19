import Link from 'next/link'
import { Ellipsis, PartyPopper } from 'lucide-react'
import { MobileShell } from '@/components/fin/mobile-shell'
import { TransactionRow } from '@/components/fin/transaction-row'
import { Watermark } from '@/components/fin/ui'
import { transactions } from '@/lib/market-data'

export default function WalletPage() {
  return (
    <MobileShell nav className="pb-32 md:pb-12" contentClassName="md:px-4 md:pt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
      <section className="relative bg-gradient-to-b from-[#fff1f1] to-[#f3c8ca]/60 px-4 pb-14 pt-12 md:overflow-hidden md:rounded-[22px] md:pt-6">
        <Watermark className="text-[#c9252d]/[0.04]">
          PAYMENT
        </Watermark>

        <h1 className="sr-only">Payment Summary</h1>

        <div className="relative rounded-[18px] bg-white/50 p-3 backdrop-blur-sm">
          <div className="flex items-start justify-between px-1 pt-1">
            <p className="max-w-[170px] text-[9px] leading-[1.45] text-ink">
              Your <span className="font-semibold">Payment Summary</span>
              {' '}at a glance. Track your recorded deposits and payment status.
            </p>

            <p
              className="-mt-2 text-[38px] font-bold leading-none tracking-tight text-transparent"
              style={{
                WebkitTextStroke: '1.5px rgba(201,37,45,0.15)',
                background: 'linear-gradient(#c9252d,#f3c8ca)',
                WebkitBackgroundClip: 'text',
              }}
              aria-hidden="true"
            >
              ₹
            </p>
          </div>

          <div className="mt-2 rounded-[14px] bg-white px-4 pb-8 pt-5 text-center shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            <p className="text-[8px] text-sub">
              Total Recorded Collection
            </p>

            <p className="mt-1 text-[30px] font-semibold tracking-[-0.02em] text-[#a91f26]">
              ₹21,200.00
            </p>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e4e7eb] pt-3">
              <div>
                <p className="text-[8px] text-sub">Approved Collection</p>
                <p className="mt-1 text-sm font-semibold text-[#26364d]">
                  ₹20,200.00
                </p>
              </div>

              <div>
                <p className="text-[8px] text-sub">Pending Collection</p>
                <p className="mt-1 text-sm font-semibold text-[#a91f26]">
                  ₹1,000.00
                </p>
              </div>
            </div>
          </div>
        </div>

        <Link
          href="/payment"
          className="absolute bottom-6 left-1/2 flex h-[40px] w-[168px] -translate-x-1/2 items-center justify-center rounded-[12px] bg-[#c9252d] text-[11px] font-medium text-white shadow-lg transition-transform active:scale-95"
        >
          View Payment History
        </Link>
      </section>

      <section className="px-4 pt-3 md:px-0 md:pt-5 lg:pt-0">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-medium text-ink">Transaction History</h2>
          <button type="button" aria-label="More options" className="text-ink">
            <Ellipsis className="size-4" />
          </button>
        </div>
        <ul className="mt-3 rounded-[16px] bg-white px-3">
          {transactions.map((t, i) => (
            <TransactionRow key={i} {...t} />
          ))}
        </ul>
      </section>
    </MobileShell>
  )
}
