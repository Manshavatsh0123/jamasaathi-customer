export default function maskDocument(value?: string) {
  if (!value) return 'Not provided'

  const clean = value.replace(/\s/g, '')

  if (clean.length <= 4) return '••••'

  return `${'•'.repeat(Math.min(clean.length - 4, 8))}${clean.slice(-4)}`
}