
import Image from 'next/image'

import { LoginForm } from '@/components/fin/login-form'
import { MobileShell } from '@/components/fin/mobile-shell'

export default function LoginPage() {
  return (
    <MobileShell className="flex min-h-dvh flex-col bg-gradient-to-b from-[var(--hs-primary-light)] to-[var(--hs-background)] px-4 pb-6 pt-8 md:justify-center md:py-10" contentClassName="flex flex-1 flex-col md:max-w-[400px] md:flex-none md:rounded-[28px] md:border md:border-[var(--hs-border-light)] md:bg-[var(--hs-surface)] md:px-6 md:py-8 md:shadow-[0_20px_60px_rgba(0,0,0,0.06)]" >

      <header className="mb-7 flex flex-col items-center">
        <div className="relative flex size-[92px] items-center justify-center">
          <Image src="/images/Logo.png" alt="BharosaSaathi logo" fill priority sizes="92px" className="object-contain"
          />
        </div>

        <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--hs-primary)]">
          BharosaSaathi
        </p>

        <div className="mt-2 h-[3px] w-8 rounded-full bg-[var(--hs-primary)]/70" />
      </header>


      <div className="px-1">
        <h1 className="text-[38px] font-medium leading-[1.04] tracking-[-0.045em] text-[var(--hs-text)]">
          Welcome
          <br />
          <span className="text-[var(--hs-primary)]">Back!</span>
        </h1>

        <p className="mt-3 text-xs leading-5 text-[var(--hs-text-secondary)]">
          Sign in to view your accounts and payment records.
        </p>
      </div>

      <LoginForm />
    </MobileShell>
  )
}
