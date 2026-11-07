
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import type {
  CustomerLoginResponse,
  CustomerProfile,
  CustomerRecord,
} from './authTypes'

type AuthState = {
  accessToken: string | null
  expiresAt: number | null
  profile: CustomerProfile | null
  customer: CustomerRecord | null
  isAuthenticated: boolean
  isInitialized: boolean
}

type UpdateAccessTokenPayload = {
  accessToken: string
  expiresAt: number
}

const initialState: AuthState = {
  accessToken: null,
  expiresAt: null,
  profile: null,
  customer: null,
  isAuthenticated: false,
  isInitialized: false,
}

/**
 * Supabase token expiry timestamps use Unix seconds.
 * Date.now() returns milliseconds, so convert it to seconds.
 */
const getCurrentTimeInSeconds = (): number => Math.floor(Date.now() / 1000)

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    /**
     * Save credentials after a successful login.
     * Never store the refresh token in Redux.
     */
    setCredentials: (
      state,
      action: PayloadAction<CustomerLoginResponse>,
    ) => {
      const response = action.payload
      const session = response?.session
      const accessToken = session?.access_token

      if (!response?.success || !accessToken) {
        return
      }

      // Prefer expires_at; otherwise derive it from expires_in.
      const expiresAt =
        typeof session.expires_at === 'number' &&
          Number.isFinite(session.expires_at)
          ? session.expires_at
          : typeof session.expires_in === 'number' &&
            Number.isFinite(session.expires_in) &&
            session.expires_in > 0
            ? getCurrentTimeInSeconds() + session.expires_in
            : null

      // Reject invalid or already-expired sessions.
      if (
        expiresAt === null ||
        expiresAt <= getCurrentTimeInSeconds()
      ) {
        return
      }

      state.accessToken = accessToken
      state.expiresAt = expiresAt
      state.profile = response.profile
      state.customer = response.customer
      state.isAuthenticated = true
      state.isInitialized = true
    },
    setInitialized: (state) => {
      state.isInitialized = true
    },


    setSessionUser: (
      state,
      action: PayloadAction<{
        profile: CustomerProfile | null
        customer: CustomerRecord
      }>,
    ) => {
      state.profile = action.payload.profile
      state.customer = action.payload.customer
      state.isAuthenticated = true
      state.isInitialized = true
    },

    updateAccessToken: (
      state,
      action: PayloadAction<{
        accessToken: string
        expiresAt: number
      }>,
    ) => {
      state.accessToken = action.payload.accessToken
      state.expiresAt = action.payload.expiresAt
    },


    hydrateSession: (
      state,
      action: PayloadAction<{
        accessToken: string
        expiresAt: number
        profile: CustomerProfile
        customer: CustomerRecord
      } | null>,
    ) => {
      const session = action.payload

      if (
        !session ||
        !session.accessToken ||
        session.expiresAt <= getCurrentTimeInSeconds()
      ) {
        state.accessToken = null
        state.expiresAt = null
        state.profile = null
        state.customer = null
        state.isAuthenticated = false
        state.isInitialized = true
        return
      }

      state.accessToken = session.accessToken
      state.expiresAt = session.expiresAt
      state.profile = session.profile
      state.customer = session.customer
      state.isAuthenticated = true
      state.isInitialized = true
    },



    /**
     * Clear all client-side authentication data.
     * The caller must separately handle backend logout/session revocation.
     */
    logout: (state) => {
      state.accessToken = null
      state.expiresAt = null
      state.profile = null
      state.customer = null
      state.isAuthenticated = false
      state.isInitialized = true
    },
  },
})

export const {
  setCredentials,
  updateAccessToken,
  setInitialized,
  setSessionUser,
  hydrateSession,
  logout,
} = authSlice.actions

export default authSlice.reducer;
