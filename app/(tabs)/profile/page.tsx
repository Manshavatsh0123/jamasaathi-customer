import Image from 'next/image'
import { FileText, Flag, Headphones, Moon, Settings, UsersRound } from 'lucide-react'
import { DarkModeToggle } from '@/components/fin/dark-mode-toggle'
import { MobileShell } from '@/components/fin/mobile-shell'
import { Card, SettingsRow, dividerClass, rowClass } from '@/components/fin/ui'
import { UsdPill } from '@/components/fin/usd-pill'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Profile Setting', icon: Settings },
  { label: 'Refer Friend', icon: UsersRound },
  { label: 'Customer Support', icon: Headphones },
  { label: 'Reports', icon: FileText },
]

export default function ProfilePage() {
  return (
    <MobileShell nav watermark="PROFILE" className="pb-32 md:pb-12">
      <div className="relative px-4 pt-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5 lg:pt-16">
        <div>
        <section className="relative rounded-[18px] bg-white px-4 pb-5 pt-14 text-center">
          <Image
            src="/images/avatar.webp"
            alt=""
            width={104}
            height={104}
            className="absolute left-1/2 top-0 size-[56px] -translate-x-1/2 -translate-y-1/2 rounded-[14px] object-cover ring-4 ring-white"
            priority
          />
          <h1 className="text-[13px] font-semibold text-ink">Faizan Ahmed</h1>
          <p className="mt-2 text-[9px] text-sub">designer.faizanahmed@gmail.com</p>
          <p className="mt-0.5 text-[9px] text-sub">+91 9876 543 210</p>
        </section>

        <section
          aria-label="Balance card"
          className="relative mt-3 overflow-hidden rounded-[14px] bg-[radial-gradient(120%_140%_at_100%_0%,#ff6a2a_0%,#d9461a_35%,#3a1a12_80%,#1a1210_100%)] px-3.5 py-3.5 text-white"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[8px] text-white/60">Your Balance</p>
              <p className="mt-0.5 text-[18px] font-medium tracking-tight">$60,400.70</p>
            </div>
            <UsdPill className="bg-white/90" />
          </div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-[6px] text-white/50">Account Number</p>
              <p className="text-[8px]">****8849</p>
            </div>
            <div className="text-right">
              <p className="text-[6px] text-white/50">Valid Thru</p>
              <p className="text-[8px]">05/29</p>
            </div>
          </div>
        </section>
        </div>

        <div>
        <Card as="ul" className="mt-3 px-3.5 lg:mt-0">
          <li className={cn(rowClass, dividerClass)}>
            <SettingsRow
              icon={Flag}
              label="Language"
              trailing={<span className="text-[7px] tracking-wide text-[#c4c4c4]">ENGLISH</span>}
            />
          </li>
          <li className={cn(rowClass, dividerClass)}>
            <SettingsRow icon={Moon} label="Dark Mode" chevron={false} trailing={<DarkModeToggle />} />
          </li>
        </Card>

        <Card as="ul" className="mt-3 px-3.5">
          {links.map(({ label, icon }) => (
            <li key={label} className={dividerClass}>
              <button type="button" className={rowClass}>
                <SettingsRow icon={icon} label={label} iconClassName="text-[#1a7f4b]" />
              </button>
            </li>
          ))}
        </Card>
        </div>
      </div>
    </MobileShell>
  )
}
