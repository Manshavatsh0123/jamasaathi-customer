import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/lib/api/baseApi'

const appReducer = (
  state = { isReady: true },
  _action: { type: string },
) => state

export const store = configureStore({
  reducer: {
    app: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch