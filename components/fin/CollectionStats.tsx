'use client'

import { useRef, useState } from 'react'
import {
  Wallet,
  Landmark,
  Clock3,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'

type DashboardSummary = {
  total_accounts: number
  approved_collection: number
  pending_collection: number
  total_collection: number
}

type Props = {
  summary: DashboardSummary
}

export function CollectionStats({ summary }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const cards = [
    {
      title: 'Total Collection',
      value: summary.total_collection,
      subtitle: 'Your total recorded collection',
      icon: Wallet,
      color: '#ffffff',
      background: '#c9252d',
      light: 'rgba(255,255,255,0.14)',
      prefix: '₹',
      isCount: false,
    },
    {
      title: 'My Accounts',
      value: summary.total_accounts,
      subtitle: 'Accounts registered to you',
      icon: Landmark,
      color: '#26364d',
      background: '#ffffff',
      light: '#eaf0f8',
      isCount: true,
    },
    {
      title: 'Pending Collection',
      value: summary.pending_collection,
      subtitle: 'Payments awaiting approval',
      icon: Clock3,
      color: '#704d09',
      background: '#fff8df',
      light: '#ffedb2',
      isCount: false,
    },
    {
      title: 'Approved Collection',
      value: summary.approved_collection,
      subtitle: 'Payments approved and recorded',
      icon: CheckCircle2,
      color: '#17643c',
      background: '#eaf7ef',
      light: '#d3efdd',
      isCount: false,
    },
  ]

  const formatAmount = (amount: number) =>
    new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 2,
    }).format(Number.isFinite(amount) ? amount : 0)

  const goTo = (index: number) => {
    const nextIndex = (index + cards.length) % cards.length
    setActiveIndex(nextIndex)

    scrollRef.current?.scrollTo({
      left: nextIndex * (scrollRef.current.clientWidth || 1),
      behavior: 'smooth',
    })
  }

  return (
    <section className="w-full min-w-0">
      <div className="flex items-center gap-3">
        {/* Previous arrow */}
        <button
          type="button"
          onClick={() => goTo(activeIndex - 1)}
          aria-label="Previous collection card"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#e4e7eb] bg-white text-ink shadow-sm transition-all hover:border-[#c9252d] hover:text-[#c9252d] active:scale-95"
        >
          <ChevronLeft className="size-5" />
        </button>

        {/* One card visible at a time */}
        <div className="min-w-0 flex-1 overflow-hidden">
          <div
            ref={scrollRef}
            onScroll={(event) => {
              const width = event.currentTarget.clientWidth
              if (width > 0) {
                setActiveIndex(
                  Math.min(
                    cards.length - 1,
                    Math.max(
                      0,
                      Math.round(event.currentTarget.scrollLeft / width),
                    ),
                  ),
                )
              }
            }}
            className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {cards.map((card) => {
              const Icon = card.icon

              return (
                <article
                  key={card.title}
                  className="w-full min-w-full snap-center"
                >
                  <div
                    className="relative min-h-[172px] overflow-hidden rounded-[18px] border border-black/5 p-5 shadow-[0_8px_24px_rgba(38,54,77,0.08)] transition-colors duration-300"
                    style={{
                      backgroundColor: card.background,
                      color: card.color,
                    }}
                  >
                    {/* Decorative circles */}
                    <div
                      className="pointer-events-none absolute -right-8 -top-10 size-32 rounded-full"
                      style={{ backgroundColor: card.light, opacity: 0.65 }}
                    />
                    <div
                      className="pointer-events-none absolute -bottom-12 right-12 size-24 rounded-full"
                      style={{ backgroundColor: card.light, opacity: 0.45 }}
                    />

                    <div className="relative flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex size-10 items-center justify-center rounded-xl"
                          style={{ backgroundColor: card.light }}
                        >
                          <Icon className="size-5" />
                        </div>

                        <div>
                          <p className="text-[12px] font-semibold">
                            {card.title}
                          </p>
                          <p className="mt-1 text-[10px] opacity-70">
                            Jama Saathi
                          </p>
                        </div>
                      </div>

                      <ShieldCheck className="size-5 opacity-60" />
                    </div>

                    <div className="relative mt-5 flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] opacity-75">
                          {card.isCount ? 'Total accounts' : 'Recorded amount'}
                        </p>

                        <p className="mt-1 truncate text-[26px] font-semibold leading-tight tracking-tight">
                          {card.isCount
                            ? card.value
                            : `₹${formatAmount(Number(card.value ?? 0))}`}
                        </p>

                        <p className="mt-2 text-[10px] opacity-75">
                          {card.subtitle}
                        </p>
                      </div>

                      <div
                        className="mb-1 flex size-8 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: card.light }}
                      >
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        {/* Next arrow */}
        <button
          type="button"
          onClick={() => goTo(activeIndex + 1)}
          aria-label="Next collection card"
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#e4e7eb] bg-white text-ink shadow-sm transition-all hover:border-[#c9252d] hover:text-[#c9252d] active:scale-95"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      {/* Slide indicators */}
      <div className="mt-3 flex items-center justify-center gap-2">
        {cards.map((card, index) => (
          <button
            key={card.title}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Show ${card.title}`}
            aria-current={activeIndex === index ? 'true' : undefined}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'w-6 bg-[#c9252d]'
                : 'w-1.5 bg-[#d7dce2] hover:bg-[#aab2bd]'
            }`}
          />
        ))}
      </div>
    </section>
  )
}