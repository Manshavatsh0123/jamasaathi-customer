import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const baseApi = createApi({
  reducerPath: 'baseApi',

  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),

  tagTypes: ['Customer', 'Account', 'Payment', 'Dashboard'],

  endpoints: () => ({}),
})