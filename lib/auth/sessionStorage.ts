
import type {
  CustomerProfile,
  CustomerRecord,
} from '@/features/auth/authTypes'

export type StoredSession = {
  accessToken: string
  expiresAt: number
  profile: CustomerProfile
  customer: CustomerRecord
}

const SESSION_KEY = 'hs_session'

export function saveSession(session: StoredSession) {
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify(session),
  )
}

export function getStoredSession(): StoredSession | null {
  try {
    const value = sessionStorage.getItem(SESSION_KEY)

    if (!value) return null

    const session = JSON.parse(value) as StoredSession

    if (
      !session.accessToken ||
      !session.expiresAt ||
      session.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      clearStoredSession()
      return null
    }

    return session
  } catch {
    clearStoredSession()
    return null
  }
}

export function clearStoredSession() {
  sessionStorage.removeItem(SESSION_KEY)
}
