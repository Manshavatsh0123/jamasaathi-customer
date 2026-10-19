'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bookmark, House, Presentation, ReceiptText, UserRound, WalletCards, WalletMinimal } from 'lucide-react'
import { cn } from '@/lib/utils'

const left = [
  { href: '/home', label: 'Home', icon: House },
  { href: '/account', label: 'Accounts', icon: WalletCards },
]

const right = [
  { href: '/payment', label: 'Payments', icon: ReceiptText },
  { href: '/profile', label: 'Profile', icon: UserRound },
]

const sideItems = [...left, ...right, { href: '/profile', label: 'Profile', icon: UserRound }]

type Item = (typeof sideItems)[number] & { active: boolean }

function NavItem({ href, label, icon: Icon, active }: Item) {
  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex size-11 items-center justify-center rounded-full transition-colors',
        active ? 'text-ink' : 'text-[#a3a3a3] hover:text-ink',
      )}
    >
      <Icon className="size-[22px]" strokeWidth={active ? 2.2 : 1.6} fill={active ? 'currentColor' : 'none'} fillOpacity={active ? 0.9 : 0} />
    </Link>
  )
}

function SideItem({ href, label, icon: Icon, active }: Item) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex h-12 items-center justify-center gap-3 rounded-[14px] text-[14px] font-medium transition-colors lg:justify-start lg:px-4',
        active ? 'bg-surface text-ink' : 'text-[#a3a3a3] hover:bg-surface/60 hover:text-ink',
      )}
    >
      <Icon className="size-[20px] shrink-0" strokeWidth={active ? 2.2 : 1.6} aria-hidden="true" />
      <span className="sr-only lg:not-sr-only">{label}</span>
    </Link>
  )
}

export function CenterGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" fill="none" aria-hidden="true">
      <rect x="3.5" y="4" width="17" height="16" rx="6" stroke="currentColor" strokeWidth="2" />
      <path d="M3.5 12h17" stroke="currentColor" strokeWidth="2" />
      <path d="M9 8h6M9 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function BottomNav() {
  const pathname = usePathname()
  return (
    <>
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] bg-white pb-[max(env(safe-area-inset-bottom),12px)] pt-2 shadow-[0_-8px_24px_rgba(0,0,0,0.04)] md:hidden"
      >
        <div className="flex items-center justify-around px-4">
          {left.map((item) => (
            <NavItem key={item.href} {...item} active={pathname === item.href} />
          ))}
          <Link
            href="/add-money"
            aria-label="Add money"
            className="-mt-9 flex size-[60px] items-center justify-center rounded-full bg-brand text-ink shadow-[0_8px_24px_rgba(200,235,20,0.55)] ring-[6px] ring-white transition-transform active:scale-95"
          >
            <CenterGlyph />
          </Link>
          {right.map((item) => (
            <NavItem key={item.href} {...item} active={pathname === item.href} />
          ))}
        </div>
      </nav>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[88px] flex-col bg-white px-3 py-6 shadow-[8px_0_24px_rgba(0,0,0,0.03)] md:flex lg:w-[232px] lg:px-4">
        <Link href="/home" className="mb-8 flex items-center justify-center gap-2.5 lg:justify-start lg:px-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand text-ink">
            <CenterGlyph />
          </span>
          <span className="hidden text-[16px] font-semibold tracking-tight text-ink lg:inline">Investly</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-col gap-1.5">
          {sideItems.map((item) => (
            <SideItem key={item.href} {...item} active={pathname === item.href} />
          ))}
        </nav>
        <Link
          href="/add-money"
          aria-label="Add money"
          className="mt-auto flex h-12 items-center justify-center gap-2 rounded-[14px] bg-brand text-[14px] font-medium text-ink shadow-[0_8px_24px_rgba(200,235,20,0.45)] transition-transform active:scale-95"
        >
          <CenterGlyph />
          <span className="hidden lg:inline">Add Money</span>
        </Link>
      </aside>
    </>
  )
}
