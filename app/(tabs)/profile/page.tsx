
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Flag, Moon, UserRound, ShieldCheck, CalendarDays, Phone, Heart, RefreshCw, CheckCircle2, Clock3, LogOut, X, } from 'lucide-react'
import { useFetchCustomerMeQuery } from '@/features/customer/customerApi'
import { MobileShell } from '@/components/fin/mobile-shell'
import { Card, SettingsRow, dividerClass, rowClass, } from '@/components/fin/ui'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/lib/store/hooks'
import { logout } from '@/features/auth/authSlice'
import DetailRow from '@/components/fin/DetailRow'
import formatDate from '@/components/fin/formatDate'


export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchCustomerMeQuery()

  const customer = data?.customer

  function handleLogout() {
    if (isLoggingOut) return

    setIsLoggingOut(true)

    dispatch(logout())

    router.replace('/login')
    router.refresh()
  }

  if (isLoading) {
    return (
      <MobileShell nav watermark="PROFILE" className="pb-32 md:pb-12">
        <div
          className="flex min-h-64 flex-col items-center justify-center gap-3"
          role="status"
          aria-live="polite"
        >
          <div className="size-7 animate-spin rounded-full border-2 border-[#f3c8ca] border-t-[var(--hs-primary)]" />
          <p className="text-sm text-sub">Loading your profile...</p>
        </div>
      </MobileShell>
    )
  }

  if (isError || !data?.success || !customer) {
    console.error('Customer profile API error:', error)

    return (
      <MobileShell nav watermark="PROFILE" className="pb-32 md:pb-12">
        <div className="mx-4 mt-16 rounded-2xl bg-white p-6 text-center shadow-[0_5px_20px_rgba(38,54,77,0.035)]">
          <UserRound className="mx-auto size-9 text-sub" />

          <p className="mt-3 text-sm font-semibold text-ink">
            Unable to load profile
          </p>

          <p className="mt-1 text-xs leading-5 text-sub">
            Please check your connection and try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--hs-primary)] px-4 py-2.5 text-xs font-medium text-white hover:bg-[var(--hs-primary-dark)]"
          >
            <RefreshCw size={14} />
            Try again
          </button>

          {/* Allow logout even if the profile API fails. */}
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#f3c8ca] text-xs font-semibold text-[var(--hs-primary)] disabled:opacity-50"
          >
            <LogOut size={15} />
            Log Out
          </button>
        </div>
      </MobileShell>
    )
  }

  return (
    <MobileShell nav watermark="PROFILE" className="pb-32 md:pb-12">
      <div className="px-4 pb-4 pt-16 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5 lg:pt-12">
        <div className="min-w-0">

          <section className="relative overflow-hidden rounded-2xl border border-white bg-white px-5 pb-5 pt-5 shadow-[0_8px_30px_rgba(38,54,77,0.05)]">
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-[#fff1f1] via-[#fff8f2] to-white" />

            <div className="relative flex items-center gap-4">
              <Image
                src="\images\Profile_image.png"
                alt="Customer profile"
                width={64}
                height={64}
                className="size-16 shrink-0 rounded-2xl border-2 border-white object-cover shadow-sm"
                priority
              />

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[var(--hs-primary)]">
                  My Profile
                </p>

                <h1 className="mt-1 break-words text-lg font-semibold tracking-tight text-ink">
                  {customer.full_name}
                </h1>

                <p className="mt-1 text-xs text-sub">
                  {customer.customer_code}
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <div className="flex items-center gap-2 text-xs text-sub">
                <Phone size={14} />
                <span>{customer.phone || 'Phone not provided'}</span>
              </div>

              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-semibold',
                  customer.status === 'ACTIVE'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-gray-100 text-gray-600',
                )}
              >
                <CheckCircle2 size={13} />
                {customer.status || 'UNKNOWN'}
              </span>
            </div>
          </section>

          {/* Personal details */}
          <Card className="mt-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-[0_5px_20px_rgba(38,54,77,0.035)]">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--hs-primary)]">
                <UserRound size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-ink">
                  Personal Details
                </h2>
                <p className="mt-0.5 text-[10px] text-sub">
                  Your registered information
                </p>
              </div>
            </div>

            <DetailRow
              label="Full Name"
              value={customer.full_name}
            />
            <DetailRow
              label="Alternate Phone"
              value={customer.alternate_phone}
              icon={Phone}
            />
            <DetailRow
              label="Nominee Name"
              value={customer.nominee_name}
              icon={Heart}
            />
          </Card>

          {/* Identity information */}
          <Card className="mt-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-[0_5px_20px_rgba(38,54,77,0.035)]">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--hs-primary)]">
                <ShieldCheck size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-ink">
                  Identity Verification
                </h2>
                <p className="mt-0.5 text-[10px] text-sub">
                  Your registered identification details
                </p>
              </div>
            </div>

            <DetailRow
              label="Aadhaar Number"
              value={customer.aadhaar}
            />
            <DetailRow
              label="PAN Number"
              value={customer.pan}
            />
          </Card>
        </div>

        <div className="min-w-0">
          {/* Membership information */}
          <Card className="mt-4 rounded-2xl border border-gray-100 bg-white px-4 py-4 shadow-[0_5px_20px_rgba(38,54,77,0.035)] lg:mt-0">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--hs-primary)]">
                <CalendarDays size={17} />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-ink">
                  Membership Details
                </h2>
                <p className="mt-0.5 text-[10px] text-sub">
                  Your account timeline
                </p>
              </div>
            </div>

            <DetailRow
              label="Customer Code"
              value={customer.customer_code}
            />
            <DetailRow
              label="Member Since"
              value={formatDate(customer.created_at)}
              icon={CalendarDays}
            />
            <DetailRow
              label="Last Updated"
              value={formatDate(customer.updated_at)}
              icon={Clock3}
            />
          </Card>

          {/* Preferences */}
          <Card
            as="ul"
            className="mt-4 rounded-2xl border border-gray-100 bg-white px-3.5 shadow-[0_5px_20px_rgba(38,54,77,0.035)]"
          >
            <li className={cn(rowClass, dividerClass)}>
              <SettingsRow
                icon={Flag}
                label="Language"
                trailing={
                  <span className="text-[9px] font-medium tracking-wide text-sub">
                    ENGLISH
                  </span>
                }
              />
            </li>
          </Card>

          {/* Logout option */}
          <section className="mt-4">
            <button
              type="button"
              onClick={() => setShowLogoutConfirm(true)}
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl border border-[#f3c8ca] bg-white px-4 py-3 text-sm font-semibold text-[var(--hs-primary)] shadow-[0_5px_20px_rgba(38,54,77,0.035)] transition-colors hover:bg-[#fff1f1] active:scale-[0.99]"
            >
              <LogOut size={17} />
              Log Out
            </button>

            <p className="mt-2 text-center text-[10px] text-sub">
              Securely sign out of your BharosaSaathi account.
            </p>
          </section>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5 backdrop-blur-[2px]"
          onClick={() => {
            if (!isLoggingOut) setShowLogoutConfirm(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-dialog-title"
            className="w-full max-w-sm rounded-2xl border border-gray-100 bg-white p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#fff1f1] text-[var(--hs-primary)]">
                <LogOut size={20} />
              </div>

              <button
                type="button"
                aria-label="Close logout confirmation"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutConfirm(false)}
                className="flex size-8 items-center justify-center rounded-full text-sub hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={17} />
              </button>
            </div>

            <h2
              id="logout-dialog-title"
              className="mt-4 text-base font-semibold text-ink"
            >
              Log out of BharosaSaathi?
            </h2>

            <p className="mt-2 text-xs leading-5 text-sub">
              You will need to sign in again to view your accounts and
              collection details.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isLoggingOut}
                onClick={() => setShowLogoutConfirm(false)}
                className="min-h-11 rounded-xl border border-gray-200 px-3 text-xs font-semibold text-ink hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={isLoggingOut}
                onClick={handleLogout}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--hs-primary)] px-3 text-xs font-semibold text-white hover:bg-[var(--hs-primary-dark)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Logging out...
                  </>
                ) : (
                  <>
                    <LogOut size={14} />
                    Yes, log out
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      )}
    </MobileShell>
  )
}
