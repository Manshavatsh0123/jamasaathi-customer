import { LoginForm } from '@/components/fin/login-form'
import { MobileShell } from '@/components/fin/mobile-shell'

export default function LoginPage() {
  return (
    <MobileShell
      className="flex flex-col px-4 pb-8 pt-14 md:justify-center md:bg-gradient-to-b md:from-[#fbf4ef] md:to-surface md:py-10"
      contentClassName="md:flex md:max-w-[400px] md:flex-col md:rounded-[28px] md:bg-surface md:px-6 md:py-10 md:shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
    >
      <h1 className="px-1 text-[44px] font-normal leading-[1.02] tracking-[-0.035em] text-ink">
        Welcome
        <br />
        Back!
      </h1>
      <LoginForm />
    </MobileShell>
  )
}
