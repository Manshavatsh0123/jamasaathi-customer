import { MobileShell } from '@/components/fin/mobile-shell'
import { FilterBar, StockRow } from '@/components/fin/stock'
import { watchlist } from '@/lib/market-data'

export default function MarketPage() {
  const half = Math.ceil(watchlist.length / 2)
  const columns = [watchlist.slice(0, half), watchlist.slice(half)]
  return (
    <MobileShell nav watermark="WATCHLIST" className="pb-32 md:pb-12">
      <h1 className="sr-only">Watchlist</h1>
      <div className="relative px-4 pt-12 md:pt-8">
        <FilterBar />
        <ul className="mt-4 rounded-[18px] bg-white px-3 lg:hidden">
          {watchlist.map((s, i) => (
            <StockRow key={`${s.name}-${i}`} stock={s} id={`m-${i}`} />
          ))}
        </ul>
        <div className="mt-4 hidden grid-cols-2 items-start gap-5 lg:grid">
          {columns.map((col, c) => (
            <ul key={c} className="rounded-[18px] bg-white px-3">
              {col.map((s, i) => (
                <StockRow key={`${s.name}-${c}-${i}`} stock={s} id={`md-${c}-${i}`} />
              ))}
            </ul>
          ))}
        </div>
      </div>
    </MobileShell>
  )
}
