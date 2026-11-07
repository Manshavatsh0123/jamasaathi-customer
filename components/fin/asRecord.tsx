type DataRecord = Record<string, unknown>

export default function asRecord(value: unknown): DataRecord {
  if (typeof value === 'object' && value !== null) {
    return value as DataRecord
  }

  return {}
}