
import { baseApi } from '@/lib/api/baseApi'
import type { CustomerDashboardResponse } from './dashboardTypes'

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchCustomerDashboardSummary: builder.query<
      CustomerDashboardResponse,
      void
    >({
      query: () => ({
        url: '/customer/dashboard/summary',
        method: 'GET',
      }),
      providesTags: ['Customer'],
    }),
  }),
})

export const {
  useFetchCustomerDashboardSummaryQuery,
} = dashboardApi
