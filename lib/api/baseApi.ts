
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'

import type { RootState } from '@/lib/store'

import {
  logout,
} from '@/features/auth/authSlice'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

if (!baseUrl?.trim()) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured')
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',

  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState
    const token = state.auth.accessToken

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }

    headers.set('Accept', 'application/json')

    return headers
  },
})

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: async (args, api, extraOptions) => {
    const result = await rawBaseQuery(
      args,
      api,
      extraOptions,
    )

    const url =
      typeof args === 'string' ? args : args.url

    const isAuthEndpoint =
      url.includes('/auth/customer/login') ||
      url.includes('/auth/login') ||
      url.includes('/auth/staff/login')

    if (
      result.error?.status === 401 &&
      !isAuthEndpoint
    ) {
      api.dispatch(logout())
      api.dispatch(baseApi.util.resetApiState())

      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('hs_session')
        window.location.replace('/login')
      }
    }

    return result
  },

  tagTypes: [
    'Customer',
    'Account',
    'Payment',
    'Dashboard',
  ],

  endpoints: () => ({}),
})
