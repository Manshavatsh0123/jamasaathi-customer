export type Stock = {
  name: string
  sector: string
  price: string
  change: string
  up: boolean
}

export const watchlist: Stock[] = [
  { name: 'NMDC', sector: 'Energy', price: '$254.20', change: '4.80 (1.90%)', up: true },
  { name: 'IRFC', sector: 'Financial Services', price: '$180.30', change: '0.05 (0.03%)', up: false },
  { name: 'Cochin Shipyard', sector: 'Machinery', price: '$2,018.05', change: '108.65 (5.69%)', up: true },
  { name: 'NHPC', sector: 'Energy', price: '$101.60', change: '1.40 (1.40%)', up: true },
  { name: 'PNB', sector: 'Financial Services', price: '$127.25', change: '0.25 (0.25%)', up: false },
  { name: 'NMDC', sector: 'Energy', price: '$254.35', change: '4.90 (1.96%)', up: true },
  { name: 'Zomato', sector: 'Financial Services', price: '$173.75', change: '6.85 (3.74%)', up: false },
  { name: 'NTPC', sector: 'Energy', price: '$356.35', change: '2.10 (0.59%)', up: true },
  { name: 'Tata Power', sector: 'Energy', price: '$412.80', change: '3.25 (0.79%)', up: true },
]

export const sparkUp = [6, 5, 7, 5.5, 8, 7, 9, 7.5, 10, 9, 12, 10.5, 13, 11, 14]
export const sparkDown = [13, 11, 12.5, 9, 11, 8, 10, 7, 9.5, 6, 8, 5.5, 7, 4, 5]

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

export function buildNiftySeries() {
  const rand = seeded(42)
  const points: number[] = []
  let v = 70
  for (let i = 0; i < 64; i++) {
    const trend = i < 30 ? 0.05 : i < 44 ? -0.9 : 0.15
    v += trend + (rand() - 0.5) * 9
    v = Math.max(15, Math.min(90, v))
    points.push(v)
  }
  return points
}

export function toPath(values: number[], width: number, height: number, pad = 2) {
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const step = width / (values.length - 1)
  return values
    .map((v, i) => {
      const x = i * step
      const y = pad + (1 - (v - min) / range) * (height - pad * 2)
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

export const transactions = [
  { title: 'Money Withdraw', date: '20 May 24 | 02:34 AM', amount: '$2,500.00', status: 'Success', type: 'out' },
  { title: 'Money Added', date: '06 May 24 | 11:54 AM', amount: '$8,000.00', status: 'Success', type: 'in' },
  { title: 'Money Added', date: '06 May 24 | 11:54 AM', amount: '$8,000.00', status: 'Failed', type: 'in' },
  { title: 'Money Added', date: '01 May 24 | 11:54 AM', amount: '$5,600.00', status: 'Success', type: 'in' },
  { title: 'Money Withdraw', date: '28 Apr 24 | 09:12 AM', amount: '$10,000.00', status: 'Success', type: 'out' },
  { title: 'Money Added', date: '20 Apr 24 | 04:40 PM', amount: '$3,200.00', status: 'Success', type: 'in' },
] as const
