
'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  RotateCw,
  ShieldCheck,
  Wallet,
  Landmark,
  ArrowRight,
  ChevronRight,
  UserRound,
  Phone,
  Heart,
  CreditCard,
  CalendarDays,
  CheckCircle2,
  Eye,
} from 'lucide-react'

import { useAppSelector } from '@/lib/store/hooks'
import { MobileShell } from '@/components/fin/mobile-shell'
import {
  useFetchCustomerDashboardSummaryQuery,
} from '@/features/dashboard/dashboardApi'
import {
  useFetchCustomerAccountsQuery,
} from '@/features/payments/paymentsApi'
import { cn } from '@/lib/utils'
import firstValue from '@/components/fin/firstValue'
import asRecord from '@/components/fin/asRecord'
import maskPhone from '@/components/fin/maskPhone'
import maskDocument from '@/components/fin/maskDocument'
import Metric from '@/components/fin/Metric'
import ProfileDetail from '@/components/fin/ProfileDetail'
import SectionHeading from '@/components/fin/SectionHeading'
import formatAmount from '@/components/fin/formatAmount'

export default function HomePage() {
  const profile = useAppSelector((state) => state.auth.profile)
  const customer = useAppSelector((state) => state.auth.customer)

  const {
    data: summaryResponse,
    isLoading: summaryLoading,
    isError: summaryError,
    refetch: refetchSummary,
  } = useFetchCustomerDashboardSummaryQuery()

  const {
    data: accountsResponse,
    isLoading: accountsLoading,
    isError: accountsError,
    refetch: refetchAccounts,
  } = useFetchCustomerAccountsQuery()

  // Prefer customer data when both objects contain the same field.
  const identity = {
    ...asRecord(profile),
    ...asRecord(customer),
  }

  const displayName =
    firstValue(identity, ['full_name', 'name', 'customer_name']) ??
    'Customer'

  const customerCode =
    firstValue(identity, ['customer_code', 'customerCode']) ??
    'Customer account'

  const phone = firstValue(identity, [
    'phone',
    'phone_number',
    'mobile_number',
    'mobile',
  ])

  const alternatePhone = firstValue(identity, [
    'alternate_phone',
    'alternate_mobile',
  ])

  const aadhaar = firstValue(identity, [
    'aadhaar',
    'aadhaar_number',
    'aadhar',
    'aadhar_number',
  ])

  const pan = firstValue(identity, [
    'pan',
    'pan_number',
    'pan_card_number',
  ])

  const nominee = firstValue(identity, [
    'nominee_name',
    'nominee_full_name',
  ])

  const accounts = accountsResponse?.accounts ?? []
  const summary = summaryResponse?.summary

  const isLoading = summaryLoading || accountsLoading
  const hasError = summaryError || accountsError

  function refreshDashboard() {
    void refetchSummary()
    void refetchAccounts()
  }

  return (
    <MobileShell
      nav
      watermark="SAATHI"
      className="min-h-screen bg-gradient-to-b from-[#fbf5f1] via-white to-white pb-32 md:pb-12"
      contentClassName="mx-auto w-full max-w-5xl"
    >
      <div className="px-4 pb-5 pt-12 sm:px-6 sm:pt-8 md:px-8">
       
        <header className="flex items-center justify-between gap-3">
          <Link
            href="/profile"
            className="flex min-w-0 items-center gap-3"
          >
            <Image
              src="\images\Profile_image.png"
              alt="Customer profile"
              width={46}
              height={46}
              className="size-[46px] shrink-0 rounded-2xl border-2 border-white object-cover shadow-sm"
              priority
            />

            <div className="min-w-0">
              <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--hs-primary)]">
                Welcome back,
              </p>

              <h1 className="mt-1 break-words text-[15px] font-semibold tracking-tight text-ink">
                {displayName}
              </h1>

              <p className="mt-0.5 text-[10px] text-sub">
                {customerCode}
              </p>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Refresh dashboard"
            onClick={refreshDashboard}
            disabled={isLoading}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white bg-white text-ink shadow-sm transition-colors hover:bg-[#fff1f1] disabled:opacity-50"
          >
            <RotateCw
              size={16}
              className={isLoading ? 'animate-spin' : ''}
            />
          </button>
        </header>

   
        <section className="relative mt-6 overflow-hidden rounded-2xl border border-white bg-white px-4 pb-3 pt-4 shadow-[0_8px_30px_rgba(38,54,77,0.05)] sm:px-5">
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-[#fff1f1] via-[#fff8f2] to-white" />

          <div className="relative flex items-start justify-between gap-3">
            <SectionHeading
              icon={ShieldCheck}
              title="Your Profile"
              description="Your registered information"
            />

            <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
              <CheckCircle2 size={12} />
              Verified details
            </span>
          </div>

          <div className="relative mt-3 grid grid-cols-2 gap-x-4 divide-y divide-gray-100/80">
            <ProfileDetail
              label="Registered mobile"
              value={maskPhone(phone)}
              icon={Phone}
            />

            <ProfileDetail
              label="Aadhaar number"
              value={maskDocument(aadhaar)}
              icon={ShieldCheck}
            />

            <ProfileDetail
              label="PAN number"
              value={maskDocument(pan)}
              icon={CreditCard}
            />

            <ProfileDetail
              label="Nominee name"
              value={nominee || 'Not provided'}
              icon={Heart}
            />
          </div>

          <div className="relative border-t border-gray-100 pt-2">
            <Link
              href="/profile"
              className="inline-flex min-h-9 items-center gap-1 text-xs font-semibold text-[var(--hs-primary)]"
            >
              View complete profile
              <ChevronRight size={15} />
            </Link>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-ink">
              Your Collection Overview
            </h2>
            <p className="mt-1 text-[11px] leading-5 text-sub">
              Your recorded collection and accounts in one place.
            </p>
          </div>

          {hasError ? (
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs leading-5 text-sub">
                We couldn&apos;t load your latest collection overview.
              </p>
              <button
                type="button"
                onClick={refreshDashboard}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-[var(--hs-primary)] px-4 py-2.5 text-xs font-semibold text-white"
              >
                <RotateCw size={14} />
                Try again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Metric
                label="Total collection"
                value={
                  summaryLoading
                    ? '…'
                    : formatAmount(summary?.total_collection)
                }
                description="Total amount recorded"
                icon={Wallet}
                featured
              />

              <Metric
                label="My accounts"
                value={accountsLoading ? '…' : String(accounts.length)}
                description={
                  accounts.length === 1
                    ? 'Account in your name'
                    : 'Accounts in your name'
                }
                icon={Landmark}
              />
            </div>
          )}
        </section>


        <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_5px_20px_rgba(38,54,77,0.035)] sm:p-5">
          <SectionHeading
            icon={Landmark}
            title="My Accounts"
            description="Account details and collection history"
          />

          <p className="mt-3 text-xs leading-5 text-sub">
            Open your account to check its collection amount, account dates,
            and recorded transactions.
          </p>

          <Link
            href="/account"
            className="mt-4 flex min-h-[48px] items-center justify-between gap-3 rounded-xl bg-[var(--hs-primary)] px-4 py-3 text-white transition-colors hover:bg-[var(--hs-primary-dark)]"
          >
            <span className="flex min-w-0 items-center gap-2.5 text-xs font-semibold sm:text-sm">
              <Eye size={17} className="shrink-0" />
              View accounts & transactions
            </span>
            <ArrowRight size={17} className="shrink-0" />
          </Link>

          <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#f8f9fb] px-3 py-3">
            <CalendarDays
              size={15}
              className="mt-0.5 shrink-0 text-[var(--hs-primary)]"
            />
            <p className="text-[10px] leading-5 text-sub">
              Your account dates, scheme details, and payment records are
              available in the account section.
            </p>
          </div>
        </section>
      </div>
    </MobileShell>
  )
}
