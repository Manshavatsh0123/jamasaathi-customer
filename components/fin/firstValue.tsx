type DataRecord = Record<string, unknown>

export default function firstValue(
  source: DataRecord,
  keys: string[],
): string | undefined {
  for (const key of keys) {
    const value = source[key]

    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }

    if (typeof value === 'number') {
      return String(value)
    }
  }

  return undefined
}