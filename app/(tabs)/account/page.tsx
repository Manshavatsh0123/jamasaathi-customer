import { Ellipsis, RotateCw } from 'lucide-react'
import { MobileShell } from '@/components/fin/mobile-shell'
import { Segmented } from '@/components/fin/segmented'
import { transactions } from '@/lib/market-data'
import { TransactionRow } from '@/components/fin/transaction-row'
import CustomerAccountSelector, { CustomerAccount } from '@/components/fin/CustomerAccountSelector'

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

export default function PortfolioPage() {
  return (
    <MobileShell nav watermark="ACCOUNT" className="pb-32 md:pb-12">

      <header className="relative flex items-center justify-between px-4 pt-12 md:pt-8">
        <h1 className="sr-only">Account</h1>
        <button type="button" aria-label="Refresh" className="flex size-9 items-center justify-center rounded-full bg-white text-ink">
          <RotateCw className="size-4" strokeWidth={1.8} />
        </button>
        <Segmented label="Account view" options={['CURRENT', 'INVEST']} />
      </header>

      <div className="relative mt-4 px-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
        <CustomerAccountSelector accounts={demoAccounts} />
        <div>

          <div className="flex items-center justify-between mt-4">
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

        </div>
      </div>
    </MobileShell>
  )
}
