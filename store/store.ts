import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/services/api/baseApi'
import authReducer from './auth.slice'
import accountsReducer from './accounts.slice'
import permissionsReducer from './permissions.slice'
import uiReducer from './ui.slice'

/**
 * Redux store configuration
 * 
 * Enterprise Best Practice:
 * - Type-safe store configuration
 * - Proper middleware setup
 * - RTK Query integration
 * 
 * This is the central store for the application.
 * Add new slices here as needed.
 */

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    accounts: accountsReducer,
    permissions: permissionsReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
