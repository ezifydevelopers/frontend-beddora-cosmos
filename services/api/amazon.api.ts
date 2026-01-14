import { baseApi } from './baseApi'
import type { SyncLog, SyncType } from '@/store/amazon.slice'

/**
 * Amazon API endpoints
 * 
 * RTK Query hooks for Amazon SP API sync operations
 */

export interface SyncRequest {
  amazonAccountId: string
  startDate?: string
  endDate?: string
  marketplaceIds?: string[]
  forceFullSync?: boolean
}

export interface SyncResponse {
  success: boolean
  message: string
  data: {
    success: boolean
    recordsSynced: number
    recordsFailed: number
    errors?: string[]
    syncLogId?: string
  }
}

export interface SyncLogsResponse {
  success: boolean
  data: SyncLog[]
}

export const amazonApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * POST /amazon/sync-orders
     * Sync orders from Amazon
     */
    syncOrders: builder.mutation<SyncResponse, SyncRequest>({
      query: (data) => ({
        url: '/amazon/sync-orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AmazonAccounts'],
    }),

    /**
     * POST /amazon/sync-fees
     * Sync fees from Amazon
     */
    syncFees: builder.mutation<SyncResponse, SyncRequest>({
      query: (data) => ({
        url: '/amazon/sync-fees',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AmazonAccounts'],
    }),

    /**
     * POST /amazon/sync-ppc
     * Sync PPC metrics from Amazon
     */
    syncPPC: builder.mutation<SyncResponse, SyncRequest>({
      query: (data) => ({
        url: '/amazon/sync-ppc',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AmazonAccounts'],
    }),

    /**
     * POST /amazon/sync-inventory
     * Sync inventory levels from Amazon
     */
    syncInventory: builder.mutation<SyncResponse, SyncRequest>({
      query: (data) => ({
        url: '/amazon/sync-inventory',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AmazonAccounts'],
    }),

    /**
     * POST /amazon/sync-listings
     * Sync listing changes from Amazon
     */
    syncListings: builder.mutation<SyncResponse, SyncRequest>({
      query: (data) => ({
        url: '/amazon/sync-listings',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AmazonAccounts'],
    }),

    /**
     * POST /amazon/sync-refunds
     * Sync refunds from Amazon
     */
    syncRefunds: builder.mutation<SyncResponse, SyncRequest>({
      query: (data) => ({
        url: '/amazon/sync-refunds',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['AmazonAccounts'],
    }),

    /**
     * GET /amazon/sync-logs
     * Get sync logs
     */
    getSyncLogs: builder.query<SyncLog[], { amazonAccountId?: string; syncType?: SyncType; limit?: number }>({
      query: (params) => ({
        url: '/amazon/sync-logs',
        method: 'GET',
        params,
      }),
      providesTags: ['AmazonAccounts'],
    }),
  }),
})

export const {
  useSyncOrdersMutation,
  useSyncFeesMutation,
  useSyncPPCMutation,
  useSyncInventoryMutation,
  useSyncListingsMutation,
  useSyncRefundsMutation,
  useGetSyncLogsQuery,
} = amazonApi
