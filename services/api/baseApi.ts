import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/store/store'

/**
 * Base API configuration for RTK Query
 * 
 * Enterprise Best Practice:
 * - Centralized API configuration
 * - Type-safe state access
 * - Automatic authentication header injection
 * - Cache tag management for invalidation
 * 
 * This is the central API setup. All API endpoints should extend from this base.
 */

// Define tag types for cache invalidation
export const tagTypes = ['Auth', 'Accounts', 'Permissions', 'Profit', 'Inventory', 'PPC', 'Alerts', 'Reports'] as const

export type TagType = typeof tagTypes[number]

// Base API URL - update this with your actual API endpoint
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5200/api'

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      // Get token from Redux state (auth slice) with proper typing
      const state = getState() as RootState
      const token = state.auth?.token
      
      // Add authorization header if token exists
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      
      // Set content type
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes,
  endpoints: () => ({}),
})

/**
 * Usage:
 * - Import baseApi in your feature API files
 * - Use baseApi.injectEndpoints() to add endpoints
 * - Example: See auth.api.ts, profit.api.ts, etc.
 */

