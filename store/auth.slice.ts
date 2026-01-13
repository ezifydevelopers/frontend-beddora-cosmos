import { createSlice, PayloadAction } from '@reduxjs/toolkit'

/**
 * Authentication slice
 * 
 * Manages authentication state (user, tokens, account)
 */

interface User {
  id: string
  email: string
  name: string | null
  emailVerified: boolean
  roles: string[]
}

interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  accountId: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  accountId: null,
  isAuthenticated: false,
  isLoading: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User
        accessToken: string
        refreshToken: string
        accountId?: string
      }>
    ) => {
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.accountId = action.payload.accountId || null
      state.isAuthenticated = true
      
      // Store tokens in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload.accessToken)
        localStorage.setItem('refreshToken', action.payload.refreshToken)
        if (action.payload.accountId) {
          localStorage.setItem('accountId', action.payload.accountId)
        }
      }
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', action.payload)
      }
    },
    setAccountId: (state, action: PayloadAction<string | null>) => {
      state.accountId = action.payload
      if (typeof window !== 'undefined') {
        if (action.payload) {
          localStorage.setItem('accountId', action.payload)
        } else {
          localStorage.removeItem('accountId')
        }
      }
    },
    clearCredentials: (state) => {
      state.user = null
      state.accessToken = null
      state.refreshToken = null
      state.accountId = null
      state.isAuthenticated = false
      
      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('accountId')
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    initializeAuth: (state) => {
      // Initialize from localStorage on app start
      if (typeof window !== 'undefined') {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const accountId = localStorage.getItem('accountId')
        
        if (accessToken && refreshToken) {
          state.accessToken = accessToken
          state.refreshToken = refreshToken
          state.accountId = accountId
          // User will be loaded via API
        }
      }
    },
  },
})

export const {
  setCredentials,
  updateAccessToken,
  setAccountId,
  clearCredentials,
  setLoading,
  initializeAuth,
} = authSlice.actions
export default authSlice.reducer
