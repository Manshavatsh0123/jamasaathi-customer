
import Image from 'next/image'
import Link from 'next/link'
import { RotateCw } from 'lucide-react'
import { MobileShell } from '@/components/fin/mobile-shell'
import { CollectionStats } from '@/components/fin/CollectionStats'
import AccountDetailsBanner from '@/components/fin/AccountDetailsBanner'
import CustomerAccountSelector, {
  type CustomerAccount,
} from '@/components/fin/CustomerAccountSelector'


const demoAccounts: CustomerAccount[] = [
  {
    id: 'account-1',
    account_number: 'ACC-006',
    scheme: 'Monthly Savings',
    frequency: 'MONTHLY',
    collection_amount: 100,
    total_collection: 20100,
    start_date: '2025-01-18',
    maturity_date: '2028-01-18',
    status: 'ACTIVE',
  },
  {
    id: 'account-2',
    account_number: 'ACC-007',
    scheme: 'Weekly Savings',
    frequency: 'WEEKLY',
    collection_amount: 100,
    total_collection: 1100,
    start_date: '2026-07-01',
    maturity_date: '2027-07-01',
    status: 'ACTIVE',
  },
]

const demoSummary = {
  total_accounts: 2,
  total_collection: 21200,
  pending_collection: 0,
  approved_collection: 200,
}

export default function HomePage() {
  return (
    <MobileShell
      nav
      className="bg-gradient-to-b from-[#fbf4ef] via-surface to-surface pb-32 md:pb-12"
    >
      {/* Customer header */}
      <header className="flex items-center justify-between px-4 pt-12 md:pt-8">
        <Link href="/profile" className="flex items-center gap-2.5">
          <Image
            src="/images/avatar.webp"
            alt="Customer profile"
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />

          <div>
            <p className="text-[9px] text-sub">Welcome Back,</p>
            <p className="text-[12px] font-medium text-ink">
              Customer
            </p>
          </div>
        </Link>

        <button
          type="button"
          aria-label="Refresh"
          className="flex size-9 items-center justify-center rounded-full bg-white text-ink"
        >
          <RotateCw className="size-4" strokeWidth={1.8} />
        </button>
      </header>

      {/* Dashboard */}
      <div className="mt-4 px-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-6">
        {/* Collection overview */}
        <div className="w-full min-w-0">
          <CollectionStats summary={demoSummary} />
        </div>

        {/* Account banner and account selector */}
        <div className="mt-5 min-w-0 lg:mt-0">
          <AccountDetailsBanner />

          <div className="mt-5">
            <CustomerAccountSelector accounts={demoAccounts} />
          </div>
        </div>
      </div>
    </MobileShell>
  )
}