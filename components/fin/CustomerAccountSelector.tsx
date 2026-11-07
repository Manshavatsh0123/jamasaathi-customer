
'use client'

import { useEffect, useState } from 'react'
import {
  ChevronDown,
  Landmark,
  CalendarDays,
  Clock3,
  Wallet,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'

import {
  useFetchCustomerAccountsQuery,
  useFetchCustomerAccountDetailsQuery,
} from '@/features/payments/paymentsApi'

import type { CustomerAccount } from '@/features/payments/paymentsTypes'

type CustomerAccountSelectorProps = {
  onAccountChange?: (accountId: string) => void
}

function formatAmount(value: number | string | null | undefined) {
  if (value == null || value === '') return '—'

  const amount = Number(value)
  if (!Number.isFinite(amount)) return '—'

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatDate(value?: string | null) {
  if (!value) return 'Not available'

  const date = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T00:00:00`)
    : new Date(value)

  if (Number.isNaN(date.getTime())) return 'Not available'

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatLabel(value?: string | null) {
  if (!value) return 'Not available'

  return value
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase())
}

function DetailRow({
  label,
  value,
  valueClassName = '',
}: {
  label: string
  value: string
  valueClassName?: string
}) {
  return (
    <div className="flex min-w-0 items-start justify-between gap-4 py-3">
      <span className="text-xs leading-5 text-[var(--hs-text-secondary)] sm:text-sm">
        {label}
      </span>

      <span
        className={`max-w-[60%] break-words text-right text-xs font-semibold leading-5 text-[var(--hs-text)] sm:text-sm ${valueClassName}`}
      >
        {value}
      </span>
    </div>
  )
}

export default function CustomerAccountSelector({
  onAccountChange,
}: CustomerAccountSelectorProps) {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useFetchCustomerAccountsQuery()

  const accounts: CustomerAccount[] = data?.accounts ?? []
  const [selectedId, setSelectedId] = useState('')

  // Automatically select the first account when the API data arrives.
  useEffect(() => {
    if (!accounts.length) {
      setSelectedId('')
      return
    }

    setSelectedId((current) =>
      accounts.some((account) => account.id === current)
        ? current
        : accounts[0].id,
    )
  }, [accounts])

  const selectedAccount =
    accounts.find((account) => account.id === selectedId) ?? accounts[0]

  useEffect(() => {
    onAccountChange?.(selectedAccount?.id ?? '')
  }, [selectedAccount?.id, onAccountChange])

  const {
    data: detailsData,
    isLoading: detailsLoading,
    isError: detailsError,
    refetch: refetchDetails,
  } = useFetchCustomerAccountDetailsQuery(selectedAccount?.id ?? '', {
    skip: !selectedAccount?.id,
  })

  if (isLoading) {
    return (
      <section className="rounded-2xl border border-[var(--hs-primary-border)] bg-[var(--hs-surface)] p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <RefreshCw className="size-4 animate-spin text-[var(--hs-primary)]" />
          <p className="text-sm text-[var(--hs-text-secondary)]">
            Loading accounts...
          </p>
        </div>
      </section>
    )
  }

  if (isError || !data?.success) {
    return (
      <section className="rounded-2xl border border-[var(--hs-primary-border)] bg-[var(--hs-surface)] p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <AlertCircle className="size-5 shrink-0 text-[var(--hs-danger)]" />

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-[var(--hs-text)]">
              My Accounts
            </h2>
            <p className="mt-1 text-xs text-[var(--hs-text-secondary)]">
              Unable to load your accounts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => refetch()}
            aria-label="Retry loading accounts"
            className="flex size-9 items-center justify-center rounded-lg border border-[var(--hs-border)] text-[var(--hs-primary)] transition hover:bg-[var(--hs-primary-light)]"
          >
            <RefreshCw className="size-4" />
          </button>
        </div>
      </section>
    )
  }

  if (!accounts.length || !selectedAccount) {
    return (
      <section className="rounded-2xl border border-[var(--hs-primary-border)] bg-[var(--hs-surface)] p-6 text-center shadow-sm">
        <Landmark className="mx-auto size-7 text-[var(--hs-primary)]" />
        <h2 className="mt-3 text-sm font-semibold text-[var(--hs-text)]">
          No accounts yet
        </h2>
        <p className="mt-1 text-xs text-[var(--hs-text-secondary)]">
          Your registered accounts will appear here.
        </p>
      </section>
    )
  }

  const status = selectedAccount.status || 'REGISTERED'
  const isActive = status.toUpperCase() === 'ACTIVE'
  const summary = detailsData?.summary

  return (
    <section className="min-w-0 overflow-hidden rounded-2xl border border-[var(--hs-primary-border)] bg-[var(--hs-surface)] shadow-[0_8px_28px_rgba(38,54,77,0.06)]">
      {/* Outer header: restrained brand color */}
      <header className="flex items-center gap-3 border-b border-[var(--hs-primary-border)] bg-[var(--hs-primary-light)]/60 px-4 py-4 sm:px-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[var(--hs-primary)] text-white">
          <Landmark className="size-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-[var(--hs-text)] sm:text-base">
            My Accounts
          </h2>
          <p className="mt-1 text-xs text-[var(--hs-text-secondary)]">
            Your account and collection details
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${
            isActive
              ? 'bg-[var(--hs-success-light)] text-[var(--hs-success)]'
              : 'bg-white text-[var(--hs-text-secondary)]'
          }`}
        >
          {formatLabel(status)}
        </span>
      </header>

      <div className="p-4 sm:p-5 lg:p-6">
        {/* Account selector */}
        <div className="max-w-2xl">
          <label
            htmlFor="customer-account-select"
            className="mb-2 block text-xs font-semibold text-[var(--hs-text-secondary)]"
          >
            Select account
          </label>

          <div className="relative">
            <select
              id="customer-account-select"
              value={selectedAccount.id}
              onChange={(event) => setSelectedId(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[var(--hs-border)] bg-white px-3 pr-10 text-sm font-medium text-[var(--hs-text)] outline-none transition focus:border-[var(--hs-primary)] focus:ring-2 focus:ring-[var(--hs-primary)]/15"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.account_number}
                  {account.scheme ? ` · ${account.scheme}` : ''}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-[var(--hs-text-muted)]" />
          </div>
        </div>

        {/*
          Laptop: two columns.
          Mobile: stacked layout.
          Inner content uses rows instead of individual cards.
        */}
        <div className="mt-5 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Collection overview */}
          <div className="min-w-0">
            <div className="border-b border-[var(--hs-border-light)] pb-3">
              <p className="text-xs font-medium text-[var(--hs-text-secondary)]">
                Recorded Collection
              </p>

              <div className="mt-2 flex items-start justify-between gap-3">
                <p className="break-words text-2xl font-bold tracking-tight text-[var(--hs-primary)] sm:text-3xl">
                  {detailsLoading
                    ? 'Loading...'
                    : formatAmount(summary?.total_collection)}
                </p>

                <Wallet className="mt-1 size-5 shrink-0 text-[var(--hs-primary)]" />
              </div>

              <p className="mt-2 break-words text-xs text-[var(--hs-text-secondary)]">
                {selectedAccount.scheme || 'Account'} ·{' '}
                {selectedAccount.account_number}
              </p>
            </div>

            {detailsError && (
              <div className="mt-3 flex items-center justify-between gap-3 border-b border-[var(--hs-border-light)] py-3">
                <p className="text-xs text-[var(--hs-danger)]">
                  Unable to load account details.
                </p>

                <button
                  type="button"
                  onClick={() => refetchDetails()}
                  className="shrink-0 text-xs font-semibold text-[var(--hs-primary)] hover:underline"
                >
                  Retry
                </button>
              </div>
            )}

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-[var(--hs-text)]">
                Collection Details
              </h3>

              <div className="mt-1 divide-y divide-[var(--hs-border-light)]">
                <DetailRow
                  label="Collection amount"
                  value={formatAmount(selectedAccount.collection_amount)}
                />

                <DetailRow
                  label="Collection frequency"
                  value={formatLabel(selectedAccount.frequency)}
                />

                <DetailRow
                  label="Previous paid"
                  value={
                    detailsLoading
                      ? 'Loading...'
                      : formatAmount(summary?.previous_paid)
                  }
                />

                <DetailRow
                  label="Approved collection"
                  value={
                    detailsLoading
                      ? 'Loading...'
                      : formatAmount(summary?.approved_collection)
                  }
                  valueClassName="text-[var(--hs-success)]"
                />

                <DetailRow
                  label="Pending collection"
                  value={
                    detailsLoading
                      ? 'Loading...'
                      : formatAmount(summary?.pending_collection)
                  }
                  valueClassName="text-[var(--hs-warning)]"
                />
              </div>
            </div>
          </div>

          {/* Timeline and status */}
          <div className="min-w-0 lg:border-l lg:border-[var(--hs-border-light)] lg:pl-6">
            <div className="flex items-center gap-2 border-b border-[var(--hs-border-light)] pb-3">
              <CalendarDays className="size-4 text-[var(--hs-primary)]" />
              <h3 className="text-sm font-semibold text-[var(--hs-text)]">
                Account Timeline
              </h3>
            </div>

            <div className="divide-y divide-[var(--hs-border-light)]">
              <DetailRow
                label="Account number"
                value={selectedAccount.account_number}
              />

              <DetailRow
                label="Scheme"
                value={selectedAccount.scheme || 'Not available'}
              />

              <DetailRow
                label="Started on"
                value={formatDate(selectedAccount.start_date)}
              />

              <DetailRow
                label="Maturity date"
                value={formatDate(selectedAccount.maturity_date)}
              />

              <DetailRow
                label="Account status"
                value={formatLabel(status)}
                valueClassName={
                  isActive ? 'text-[var(--hs-success)]' : ''
                }
              />
            </div>

            <div className="mt-4 flex items-start gap-2 border-t border-[var(--hs-border-light)] pt-4">
              {isActive ? (
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--hs-success)]" />
              ) : (
                <Clock3 className="mt-0.5 size-4 shrink-0 text-[var(--hs-text-secondary)]" />
              )}

              <p className="text-xs leading-5 text-[var(--hs-text-secondary)]">
                {isActive
                  ? 'This account is currently active.'
                  : 'Check the account status for the latest information.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
