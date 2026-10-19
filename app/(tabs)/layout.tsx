import { BottomNav } from '@/components/fin/bottom-nav'

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}
