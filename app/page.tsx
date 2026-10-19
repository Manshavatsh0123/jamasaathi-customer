import Link from 'next/link'
import { MobileShell } from '@/components/fin/mobile-shell'
import { OnboardingHero } from '@/components/fin/onboarding-hero'

export default function OnboardingPage() {
  return (
    <MobileShell
      className="flex flex-col bg-gradient-to-b from-[#fbeee6] via-[#fbf8f5] to-white md:justify-center md:py-10"
      contentClassName="md:max-w-[420px] lg:flex lg:max-w-[860px] lg:items-center lg:gap-10"
    >
      <div className="contents lg:block lg:flex-1">
        <OnboardingHero />
      </div>

      <section className="flex flex-1 flex-col px-6 pb-[max(env(safe-area-inset-bottom),32px)] pt-12 max-[360px]:px-5 md:pb-0 [@media(max-height:640px)]:pb-6 [@media(max-height:640px)]:pt-4 lg:pt-0">
        <h1 className="text-balance text-[40px] font-medium leading-[1.02] tracking-[-0.03em] text-ink max-[360px]:text-[36px]">
          Your Money.
          <br />
          Your Records.
          <br />
          Made Simple.
        </h1>

        <p className="mt-5 max-w-[300px] text-pretty text-[11px] leading-[1.6] text-sub">
          Access your accounts, check recorded collections, and track every
          payment with ease. Your collection records, all in one place.
        </p>

        <Link
          href="/login"
          className="mt-auto flex h-[52px] shrink-0 items-center justify-center rounded-[14px] bg-brand text-[13px] font-medium text-ink transition-transform active:scale-[0.98] sm:mt-8"
        >
          Get Started
        </Link>
      </section>
    </MobileShell>
  )
}