import { baseApi } from './baseApi'

/**
 * Accounts API endpoints
 */

export interface Account {
  id: string
  name: string
  sellerId: string | null
  region: string | null
  isDefault: boolean
  isActive: boolean
  marketplaces: Array<{
    id: string
    name: string
    code: string
    region: string | null
  }>
  createdAt: string
}

export interface CreateAccountRequest {
  name: string
  sellerId?: string
  region?: string
  marketplaceIds?: string[]
}

export interface SwitchAccountRequest {
  accountId: string
}

export const accountsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query<Account[], void>({
      query: () => '/accounts',
      providesTags: ['Accounts'],
    }),
    createAccount: builder.mutation<Account, CreateAccountRequest>({
      query: (data) => ({
        url: '/accounts',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Accounts'],
    }),
    switchAccount: builder.mutation<{ accountId: string; message: string }, SwitchAccountRequest>({
      query: (data) => ({
        url: '/accounts/switch',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Accounts', 'Auth'],
    }),
    getAccountMarketplaces: builder.query<Account['marketplaces'], string>({
      query: (accountId) => `/accounts/${accountId}/marketplaces`,
      providesTags: (result, error, accountId) => [{ type: 'Accounts', id: accountId }],
    }),
  }),
})

export const {
  useGetAccountsQuery,
  useCreateAccountMutation,
  useSwitchAccountMutation,
  useGetAccountMarketplacesQuery,
} = accountsApi
