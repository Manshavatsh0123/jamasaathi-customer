
import { baseApi } from '@/lib/api/baseApi'

import type {
  AccountListResponse,
  AccountDetailsResponse,
  AccountPaymentsResponse,
} from './paymentsTypes'

export const paymentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all customer accounts
    fetchCustomerAccounts: builder.query<
      AccountListResponse,
      void
    >({
      query: () => '/customer/accounts',
    }),

    // Fetch details for a single customer account
    fetchCustomerAccountDetails: builder.query<
      AccountDetailsResponse,
      string
    >({
      query: (accountId) =>
        `/customer/accounts/${encodeURIComponent(accountId)}`,
    }),

    // Fetch payments for a specific account
    fetchCustomerAccountPayments: builder.query<
      AccountPaymentsResponse,
      string
    >({
      query: (accountId) =>
        `/customer/accounts/${encodeURIComponent(accountId)}/payments`,
    }),
  }),

  overrideExisting: false,
})

export const {
  useFetchCustomerAccountsQuery,
  useFetchCustomerAccountDetailsQuery,
  useFetchCustomerAccountPaymentsQuery,
} = paymentsApi
