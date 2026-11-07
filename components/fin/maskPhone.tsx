export default function maskPhone(value?: string) {
  if (!value) return 'Not provided'

  const digits = value.replace(/\D/g, '')

  if (digits.length < 4) return '••••'

  return `••••••${digits.slice(-4)}`
}