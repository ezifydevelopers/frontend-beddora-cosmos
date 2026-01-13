import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Account } from '@/services/api/accounts.api'

/**
 * Accounts slice
 * 
 * Manages user accounts and active account
 */

interface AccountsState {
  accounts: Account[]
  activeAccount: Account | null
  isLoading: boolean
}

const initialState: AccountsState = {
  accounts: [],
  activeAccount: null,
  isLoading: false,
}

const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload
      // Set active account to default if exists
      const defaultAccount = action.payload.find((acc) => acc.isDefault)
      if (defaultAccount) {
        state.activeAccount = defaultAccount
      }
    },
    setActiveAccount: (state, action: PayloadAction<Account | null>) => {
      state.activeAccount = action.payload
    },
    addAccount: (state, action: PayloadAction<Account>) => {
      state.accounts.push(action.payload)
      if (action.payload.isDefault) {
        state.activeAccount = action.payload
      }
    },
    updateAccount: (state, action: PayloadAction<Account>) => {
      const index = state.accounts.findIndex((acc) => acc.id === action.payload.id)
      if (index !== -1) {
        state.accounts[index] = action.payload
        if (state.activeAccount?.id === action.payload.id) {
          state.activeAccount = action.payload
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const {
  setAccounts,
  setActiveAccount,
  addAccount,
  updateAccount,
  setLoading: setAccountsLoading,
} = accountsSlice.actions
export default accountsSlice.reducer
