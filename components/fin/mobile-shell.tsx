import { cn } from '@/lib/utils'
import { Watermark } from './ui'

export function MobileShell({
  children,
  className,
  contentClassName,
  watermark,
  nav = false,
}: {
  children: React.ReactNode
  className?: string
  contentClassName?: string
  watermark?: string
  nav?: boolean
}) {
  return (
    <div className="flex min-h-dvh justify-center md:block">
      <main
        className={cn( 'relative min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-surface md:max-w-none',
          nav && 'md:pl-[88px] lg:pl-[232px]',
          className,
        )} >

        {watermark ? (
          <Watermark className="md:left-auto md:right-8 md:translate-x-0 lg:text-[140px]">{watermark}</Watermark>
        ) : null}

        <div
          className={cn(
            'contents md:relative md:mx-auto md:block md:w-full md:max-w-[560px] md:[zoom:1.15] lg:max-w-[920px] lg:[zoom:1.2]',
            contentClassName,
          )} >
          {children}
        </div>
      </main>
    </div>
  )
}
