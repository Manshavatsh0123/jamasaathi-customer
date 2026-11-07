
'use client'

import { useCallback, useState } from 'react'
import { RotateCw } from 'lucide-react'

import { MobileShell } from '@/components/fin/mobile-shell'
import { Segmented } from '@/components/fin/segmented'
import CustomerAccountSelector from '@/components/fin/CustomerAccountSelector'
import {
  TransactionRow,
  type TransactionRowData,
} from '@/components/fin/transaction-row'

import {
  useFetchCustomerAccountPaymentsQuery,
} from '@/features/payments/paymentsApi'

function formatAmount(value: number | string) {
  const amount = Number(value)

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0)
}

function formatDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) return 'Date unavailable'

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function PortfolioPage() {
  const [accountId, setAccountId] = useState('')

  const handleAccountChange = useCallback((id: string) => {
    setAccountId(id)
  }, [])

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useFetchCustomerAccountPaymentsQuery(accountId, {
    skip: !accountId,
  })

  const payments = data?.payments ?? []

  const transactions: TransactionRowData[] = payments.map((payment) => ({
    type: 'in',
    title: payment.receipt_number
      ? `Receipt ${payment.receipt_number}`
      : payment.reference_number
        ? `Ref: ${payment.reference_number}`
        : `Payment · ${payment.id.slice(0, 8)}`,
    date: formatDate(payment.payment_date),
    amount: formatAmount(payment.amount),
    status: payment.status,
  }))

  return (
    <MobileShell nav watermark="ACCOUNT" className="pb-32 md:pb-12">
      <header className="relative flex items-center justify-between px-4 pt-12 md:pt-8">
        <h1 className="sr-only">Account</h1>

        <button
          type="button"
          aria-label="Refresh account and payments"
          onClick={() => {
            if (accountId) refetch()
          }}
          className="flex size-9 items-center justify-center rounded-full bg-white text-ink"
        >
          <RotateCw
            className={`size-4 ${isFetching ? 'animate-spin' : ''}`}
            strokeWidth={1.8}
          />
        </button>

        <Segmented label="Account view" options={['CURRENT', 'INVEST']} />
      </header>

      <div className="relative mt-4 px-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
        <CustomerAccountSelector onAccountChange={handleAccountChange} />

        <div>
          <div className="mt-4 flex items-center justify-between">
            <h2 className="text-[11px] font-medium text-ink">
              Transaction History
            </h2>

            <button
              type="button"
              aria-label="Refresh transaction history"
              onClick={() => {
                if (accountId) refetch()
              }}
              disabled={!accountId || isFetching}
              className="text-ink disabled:opacity-40"
            >
              <RotateCw
                className={`size-4 ${isFetching ? 'animate-spin' : ''}`}
              />
            </button>
          </div>

          <ul className="mt-3 rounded-[16px] bg-white px-3">
            {!accountId || isLoading ? (
              <li className="py-6 text-center text-xs text-sub">
                Loading transactions...
              </li>
            ) : isError || !data?.success ? (
              <li className="py-6 text-center">
                <p className="text-xs text-sub">
                  Unable to load transaction history.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="mt-2 text-xs font-semibold text-[var(--hs-primary)]"
                >
                  Try again
                </button>
              </li>
            ) : transactions.length === 0 ? (
              <li className="py-6 text-center text-xs text-sub">
                No transactions found for this account.
              </li>
            ) : (
              transactions.map((transaction, index) => (
                <TransactionRow
                  key={payments[index].id}
                  {...transaction}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </MobileShell>
  )
}
