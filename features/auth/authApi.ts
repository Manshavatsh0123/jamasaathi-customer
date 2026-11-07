import { baseApi } from '@/lib/api/baseApi'

import type {
  CustomerLoginRequest,
  CustomerLoginResponse,
  CustomerProfile,
  CustomerRecord,
} from './authTypes'


export type CustomerRefreshResponse = {
  success: boolean
  message?: string
  session?: {
    access_token: string
    token_type?: string
    expires_in?: number
    expires_at?: number
  }
  access_token?: string
  expires_in?: number
  expires_at?: number
}


export type CustomerMeResponse = {
  success: boolean
  message?: string
  user: {
    id: string
    email: string
  }
  profile: CustomerProfile
  customer: CustomerRecord
}


export type CustomerLogoutResponse = {
  success: boolean
  message?: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    customerLogin: builder.mutation<
      CustomerLoginResponse,
      CustomerLoginRequest
    >({
      query: (credentials) => ({
        url: '/auth/customer/login',
        method: 'POST',
        body: credentials,
      }),
    }),


    refreshSession: builder.mutation<
      CustomerRefreshResponse,
      void
    >({
      query: () => ({
        url: '/auth/refresh',
        method: 'POST',
      }),
    }),


    customerLogout: builder.mutation<
      CustomerLogoutResponse,
      void
    >({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),

  overrideExisting: false,
})

export const {
  useCustomerLoginMutation,
  useRefreshSessionMutation,
  useCustomerLogoutMutation,
} = authApi
