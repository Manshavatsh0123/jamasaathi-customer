import Link from 'next/link'
import { Ellipsis, PartyPopper } from 'lucide-react'
import { MobileShell } from '@/components/fin/mobile-shell'
import { TransactionRow } from '@/components/fin/transaction-row'
import { Watermark } from '@/components/fin/ui'
import { transactions } from '@/lib/market-data'

export default function WalletPage() {
  return (
    <MobileShell nav className="pb-32 md:pb-12" contentClassName="md:px-4 md:pt-8 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
      <section className="relative bg-gradient-to-b from-[#d6f21e] to-[#e9f98a] px-4 pb-14 pt-12 md:overflow-hidden md:rounded-[22px] md:pt-6">
        <Watermark className="text-black/[0.04]">WALLET</Watermark>
        <h1 className="sr-only">Wallet</h1>
        <div className="relative rounded-[18px] bg-white/40 p-3 backdrop-blur-sm">
          <div className="flex items-start justify-between px-1 pt-1">
            <p className="max-w-[150px] text-[9px] leading-[1.45] text-ink">
              The higher your <span className="font-semibold">Vital Score</span> the more cash rewards you earn each month{' '}
              <PartyPopper className="inline size-3 text-[#e0821a]" aria-hidden="true" />
            </p>
            <p
              className="-mt-2 text-[52px] font-bold leading-none tracking-tight text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(17,17,17,0.12)', background: 'linear-gradient(#c6dd2a,#eaf9a0)', WebkitBackgroundClip: 'text' }}
              aria-label="Vital score 72"
            >
              72
            </p>
          </div>
          <div className="mt-2 rounded-[14px] bg-white px-4 pb-10 pt-5 text-center shadow-[0_6px_20px_rgba(0,0,0,0.04)]">
            <p className="text-[8px] text-sub">For Stocks, F&amp;O</p>
            <p className="mt-1 text-[30px] font-semibold tracking-[-0.02em] text-[#1d4a17]">$25,000.00</p>
          </div>
        </div>
        <Link
          href="/add-money"
          className="absolute bottom-6 left-1/2 flex h-[40px] w-[168px] -translate-x-1/2 items-center justify-center rounded-[12px] bg-ink text-[11px] font-medium text-white shadow-lg transition-transform active:scale-95"
        >
          Add Money
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
