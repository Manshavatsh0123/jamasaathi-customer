
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  House,
  UserRound,
  WalletCards,
} from 'lucide-react'

import { cn } from '@/lib/utils'

const sideItems = [
  { href: '/home', label: 'Home', icon: House },
  { href: '/account', label: 'Accounts', icon: WalletCards },
  { href: '/profile', label: 'Profile', icon: UserRound },
]

type Item = (typeof sideItems)[number] & {
  active: boolean
}

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

function NavItem({ href, label, icon: Icon, active }: Item) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative flex min-w-0 flex-1 flex-col items-center justify-center',
        'gap-1 rounded-xl px-1 py-1.5',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--hs-primary)]',
        active
          ? 'text-[var(--hs-primary)]'
          : 'text-[var(--hs-text-muted)] hover:text-[var(--hs-primary)]',
      )}
    >
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-[11px]',
          'transition-all duration-200',
          active
            ? 'bg-[var(--hs-primary)] text-white shadow-[0_3px_8px_rgba(201,37,45,0.18)]'
            : 'group-hover:bg-[var(--hs-primary-light)]',
        )}
      >
        <Icon
          className="size-[19px]"
          strokeWidth={active ? 2.3 : 1.7}
          aria-hidden="true"
        />
      </span>

      <span
        className={cn(
          'text-[10px] leading-tight',
          active ? 'font-semibold' : 'font-medium',
        )}
      >
        {label}
      </span>
    </Link>
  )
}

function SideItem({ href, label, icon: Icon, active }: Item) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex h-10 items-center justify-center gap-2.5 rounded-xl',
        'text-[13px] font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-[var(--hs-primary)]',
        'lg:justify-start lg:px-3',
        active
          ? 'bg-[var(--hs-surface)] text-[var(--hs-primary)] shadow-sm'
          : 'text-[var(--hs-text-muted)] hover:bg-[var(--hs-surface)]/70 hover:text-[var(--hs-text)]',
      )}
    >
      <Icon
        className="size-[19px] shrink-0"
        strokeWidth={active ? 2.2 : 1.7}
        aria-hidden="true"
      />
      <span className="sr-only lg:not-sr-only">{label}</span>
    </Link>
  )
}

export function CenterGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.5"
        y="4"
        width="17"
        height="16"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="2" />
      <path
        d="M9 8h6M9 16h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function BottomNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Compact premium mobile navigation */}
      <nav
        aria-label="Primary navigation"
        className={cn(
          'fixed inset-x-3 bottom-2 z-40 mx-auto max-w-[390px] md:hidden',
          'rounded-[19px] border border-[var(--hs-border-light)]',
          'bg-[var(--hs-surface)]/95 px-2 py-1.5',
          'pb-[max(6px,env(safe-area-inset-bottom))]',
          'shadow-[0_4px_22px_rgba(15,23,42,0.09)]',
          'backdrop-blur-xl',
        )}
      >
        <div className="flex items-center gap-1">
          {sideItems.map((item) => (
            <NavItem
              key={item.href}
              {...item}
              active={isRouteActive(pathname, item.href)}
            />
          ))}
        </div>
      </nav>

      {/* Desktop sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden w-[76px] flex-col',
          'border-r border-[var(--hs-border-light)]',
          'bg-[var(--hs-primary-light)] px-2.5 py-5',
          'md:flex lg:w-[220px] lg:px-3',
        )}
      >
        <Link
          href="/home"
          className="mb-6 flex items-center justify-center gap-2 lg:justify-start lg:px-1"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--hs-primary)] text-white">
            <CenterGlyph />
          </span>

          <span className="hidden text-[15px] font-semibold tracking-tight text-[var(--hs-text)] lg:inline">
            Jama Saathi
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="flex flex-col gap-1">
          {sideItems.map((item) => (
            <SideItem
              key={item.href}
              {...item}
              active={isRouteActive(pathname, item.href)}
            />
          ))}
        </nav>

        <Link
          href="/add-money"
          className={cn(
            'mt-auto flex h-10 items-center justify-center gap-2 rounded-xl',
            'bg-[var(--hs-primary)] text-[13px] font-medium text-white',
            'transition-colors hover:bg-[var(--hs-primary-dark)]',
            'lg:justify-start lg:px-3',
          )}
        >
          <CenterGlyph />
          <span className="hidden lg:inline">Account Options</span>
        </Link>
      </aside>
    </>
  )
}
