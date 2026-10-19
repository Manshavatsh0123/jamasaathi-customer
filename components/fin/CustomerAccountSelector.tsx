
'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Wallet,
  CalendarDays,
  Landmark,
  Clock3,
  CheckCircle2,
  FileText,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'

export type CustomerAccount = {
  id: string
  account_number: string
  scheme?: string | null
  frequency: string
  collection_amount: number
  total_collection?: number | null
  start_date?: string | null
  maturity_date?: string | null
  status?: string | null
}

type Props = {
  accounts: CustomerAccount[]
}

function formatAmount(value: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0)
}

function formatDate(value?: string | null) {
  if (!value) return 'Not available'

  // Avoid timezone shifts when parsing a date-only API value.
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.test(value)
  const date = dateOnly
    ? new Date(`${value}T00:00:00`)
    : new Date(value)

  if (Number.isNaN(date.getTime())) return 'Not available'

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function CustomerAccountSelector({
  accounts,
}: Props) {
  const [selectedId, setSelectedId] = useState(
    accounts[0]?.id ?? '',
  )

  const selectedAccount =
    accounts.find((account) => account.id === selectedId) ??
    accounts[0]

  if (!accounts.length) {
    return (
      <section className="overflow-hidden rounded-[20px] border border-[#e4e7eb] bg-white shadow-[0_8px_28px_rgba(38,54,77,0.05)]">
        <div className="flex items-center gap-3 border-b border-[#eef0f3] p-4 sm:p-5">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fff1f1]">
            <Landmark className="size-5 text-[#c9252d]" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-ink">
              My Accounts
            </h2>
            <p className="mt-1 text-[11px] text-sub">
              Your collection details in one place
            </p>
          </div>
        </div>

        <div className="px-5 py-8 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#f6f7f9]">
            <FileText className="size-6 text-[#8994a3]" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-ink">
            No accounts available yet
          </h3>

          <p className="mx-auto mt-2 max-w-[260px] text-xs leading-5 text-sub">
            Your accounts will appear here once they have been
            created for you.
          </p>
        </div>
      </section>
    )
  }

  const status = selectedAccount?.status || 'REGISTERED'
  const isActive = status.toUpperCase() === 'ACTIVE'

  return (
    <section className="min-w-0 overflow-hidden rounded-[20px] border border-[#e4e7eb] bg-white shadow-[0_8px_28px_rgba(38,54,77,0.05)]">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eef0f3] p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fff1f1]">
            <Landmark className="size-5 text-[#c9252d]" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-ink">
              My Accounts
            </h2>

            <p className="mt-1 text-[11px] text-sub">
              {accounts.length} {accounts.length === 1 ? 'account' : 'accounts'} available
            </p>
          </div>
        </div>

        <ShieldCheck className="size-5 text-[#c9252d]" />
      </div>

      {selectedAccount && (
        <div className="p-4 sm:p-5">

          {/* Account selector */}
          <label
            htmlFor="customer-account-select"
            className="mb-2 block text-[11px] font-medium text-sub"
          >
            Select account to view
          </label>

          <div className="relative">
            <select
              id="customer-account-select"
              value={selectedAccount.id}
              onChange={(event) => setSelectedId(event.target.value)}
              className="h-12 w-full appearance-none rounded-xl border border-[#e4e7eb] bg-[#f8f9fb] pl-3.5 pr-10 text-xs font-semibold text-ink outline-none transition hover:border-[#c9252d]/40 focus:border-[#c9252d] focus:ring-4 focus:ring-[#c9252d]/10"
            >
              {accounts.map((account) => (
                <option key={account.id} value={account.id}>
                  {account.account_number}
                  {account.scheme ? ` · ${account.scheme}` : ''}
                </option>
              ))}
            </select>

            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-sub" />
          </div>

          {/* Featured account card */}
          <div className="relative mt-4 overflow-hidden rounded-[18px] bg-gradient-to-br from-[#c9252d] via-[#b9232b] to-[#861b25] p-4 text-white shadow-[0_10px_24px_rgba(201,37,45,0.18)] sm:p-5">

            {/* Decorative background */}
            <div className="pointer-events-none absolute -right-10 -top-12 size-40 rounded-full border-[24px] border-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-16 right-16 size-36 rounded-full bg-white/[0.05]" />

            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-white/70">
                  Account Overview
                </p>

                <h3 className="mt-2 break-words text-lg font-semibold tracking-tight">
                  {selectedAccount.scheme || 'Savings Account'}
                </h3>

                <p className="mt-1 break-words text-[11px] text-white/75">
                  Account No. {selectedAccount.account_number}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1.5">
                <span
                  className={`size-1.5 rounded-full ${
                    isActive ? 'bg-[#86efac]' : 'bg-white/70'
                  }`}
                />

                <span className="text-[9px] font-medium">
                  {status.replace(/_/g, ' ')}
                </span>
              </div>
            </div>

            <div className="relative mt-6 border-t border-white/15 pt-4">
              <p className="text-[10px] text-white/70">
                Recorded Collection
              </p>

              <div className="mt-1 flex items-end justify-between gap-2">
                <p className="min-w-0 break-words text-[27px] font-semibold leading-tight tracking-tight sm:text-[30px]">
                  {selectedAccount.total_collection != null
                    ? formatAmount(selectedAccount.total_collection)
                    : '—'}
                </p>

                <div className="mb-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Wallet className="size-[18px]" />
                </div>
              </div>

              <p className="mt-2 text-[10px] text-white/70">
                {selectedAccount.total_collection != null
                  ? 'Total recorded for this account'
                  : 'Collection total not available'}
              </p>
            </div>
          </div>

          {/* Collection details */}
          <div className="mt-4 grid grid-cols-2 gap-3">

            <div className="min-w-0 rounded-[14px] border border-[#eef0f3] bg-white p-3.5 transition-colors hover:bg-[#fafbfc] sm:p-4">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#fff1f1]">
                <Wallet className="size-[17px] text-[#c9252d]" />
              </div>

              <p className="mt-3 text-[10px] text-sub">
                Collection Amount
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-ink">
                {formatAmount(selectedAccount.collection_amount)}
              </p>

              <p className="mt-1 text-[10px] text-sub">
                {selectedAccount.frequency.toLowerCase().replace(/^./, (char) => char.toUpperCase())} collection
              </p>
            </div>

            <div className="min-w-0 rounded-[14px] border border-[#eef0f3] bg-white p-3.5 transition-colors hover:bg-[#fafbfc] sm:p-4">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#eaf3ff]">
                <Clock3 className="size-[17px] text-[#2864b4]" />
              </div>

              <p className="mt-3 text-[10px] text-sub">
                Collection Frequency
              </p>

              <p className="mt-1 break-words text-sm font-semibold text-ink">
                {selectedAccount.frequency}
              </p>

              <p className="mt-1 text-[10px] text-sub">
                Scheduled frequency
              </p>
            </div>
          </div>

          {/* Account timeline */}
          <div className="mt-5">
            <div className="mb-3 flex items-center gap-2">
              <CalendarDays className="size-4 text-[#c9252d]" />
              <h3 className="text-xs font-semibold text-ink">
                Account Timeline
              </h3>
            </div>

            <div className="relative grid grid-cols-2 gap-3">
              <div className="min-w-0 rounded-[13px] bg-[#f8f9fb] p-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#2864b4]" />
                  <p className="text-[10px] text-sub">Started on</p>
                </div>

                <p className="mt-2 break-words text-xs font-semibold text-ink">
                  {formatDate(selectedAccount.start_date)}
                </p>
              </div>

              <div className="min-w-0 rounded-[13px] bg-[#f8f9fb] p-3.5">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#c9252d]" />
                  <p className="text-[10px] text-sub">Maturity date</p>
                </div>

                <p className="mt-2 break-words text-xs font-semibold text-ink">
                  {formatDate(selectedAccount.maturity_date)}
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#eef0f3] pt-3">
            <div className="flex min-w-0 items-center gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-[#16834a]" />

              <p className="text-[10px] text-sub">
                Account details at a glance
              </p>
            </div>

            <ArrowUpRight className="size-4 shrink-0 text-[#8994a3]" />
          </div>
        </div>
      )}
    </section>
  )
}