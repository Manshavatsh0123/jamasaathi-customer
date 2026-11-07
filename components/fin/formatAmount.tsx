export default function formatAmount(value: unknown) {
  if (value == null || value === '') return '—'

  const amount = Number(value)

  if (!Number.isFinite(amount)) return '—'

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}