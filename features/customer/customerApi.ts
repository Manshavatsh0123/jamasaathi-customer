
import { baseApi } from '@/lib/api/baseApi'
import type { CustomerMeResponse } from './customerTypes'

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCustomerMe: builder.query<CustomerMeResponse, void>({
      query: () => ({
        url: '/customer/me',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
})

export const {
  useFetchCustomerMeQuery,
  useLazyFetchCustomerMeQuery,
} = customerApi
