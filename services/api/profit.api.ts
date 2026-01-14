import { baseApi } from './baseApi'

/**
 * Profit API endpoints
 * 
 * Provides RTK Query hooks for profit calculations and aggregations
 * Supports real-time profit dashboard with filtering and breakdowns
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Profit filter parameters
 */
export interface ProfitFilters {
  accountId?: string
  amazonAccountId?: string
  marketplaceId?: string
  sku?: string
  startDate?: string
  endDate?: string
  period?: 'day' | 'week' | 'month'
}

/**
 * Profit summary metrics
 */
export interface ProfitSummary {
  salesRevenue: number
  totalExpenses: number
  totalFees: number
  totalRefunds: number
  totalCOGS: number
  grossProfit: number
  netProfit: number
  grossMargin: number
  netMargin: number
  orderCount: number
  period: {
    startDate: string | null
    endDate: string | null
  }
}

/**
 * Product-level profit breakdown
 */
export interface ProductProfitBreakdown {
  sku: string
  productId: string | null
  productTitle: string | null
  salesRevenue: number
  totalExpenses: number
  totalFees: number
  totalRefunds: number
  totalCOGS: number
  grossProfit: number
  netProfit: number
  grossMargin: number
  netMargin: number
  unitsSold: number
  orderCount: number
}

/**
 * Marketplace-level profit breakdown
 */
export interface MarketplaceProfitBreakdown {
  marketplaceId: string
  marketplaceName: string
  marketplaceCode: string
  salesRevenue: number
  totalExpenses: number
  totalFees: number
  totalRefunds: number
  totalCOGS: number
  grossProfit: number
  netProfit: number
  grossMargin: number
  netMargin: number
  orderCount: number
}

/**
 * Time-series profit trend data
 */
export interface ProfitTrendData {
  date: string
  period: string
  salesRevenue: number
  totalExpenses: number
  totalFees: number
  totalRefunds: number
  totalCOGS: number
  grossProfit: number
  netProfit: number
  grossMargin: number
  netMargin: number
  orderCount: number
}

/**
 * Profit trends response
 */
export interface ProfitTrendsResponse {
  data: ProfitTrendData[]
  period: 'day' | 'week' | 'month'
  startDate: string
  endDate: string
}

/**
 * API Response wrappers
 */
export interface ProfitSummaryResponse {
  success: boolean
  data: ProfitSummary
}

export interface ProductBreakdownResponse {
  success: boolean
  data: ProductProfitBreakdown[]
  totalRecords: number
}

export interface MarketplaceBreakdownResponse {
  success: boolean
  data: MarketplaceProfitBreakdown[]
  totalRecords: number
}

export interface ProfitTrendsApiResponse {
  success: boolean
  data: ProfitTrendsResponse
}

// ============================================
// RTK QUERY ENDPOINTS
// ============================================

export const profitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get profit summary
     * Returns aggregated metrics for a given period
     */
    getProfitSummary: builder.query<ProfitSummary, ProfitFilters>({
      query: (filters) => ({
        url: '/profit/summary',
        params: filters,
      }),
      providesTags: ['Profit'],
      // Cache for 30 seconds to reduce load while allowing real-time updates
      keepUnusedDataFor: 30,
    }),

    /**
     * Get profit breakdown by product/SKU
     * Returns profit metrics grouped by SKU
     */
    getProfitByProduct: builder.query<ProductProfitBreakdown[], ProfitFilters>({
      query: (filters) => ({
        url: '/profit/by-product',
        params: filters,
      }),
      providesTags: ['Profit'],
      keepUnusedDataFor: 30,
    }),

    /**
     * Get profit breakdown by marketplace
     * Returns profit metrics grouped by marketplace
     */
    getProfitByMarketplace: builder.query<MarketplaceProfitBreakdown[], ProfitFilters>({
      query: (filters) => ({
        url: '/profit/by-marketplace',
        params: filters,
      }),
      providesTags: ['Profit'],
      keepUnusedDataFor: 30,
    }),

    /**
     * Get profit trends over time
     * Returns time-series data for chart visualization
     */
    getProfitTrends: builder.query<ProfitTrendsResponse, ProfitFilters>({
      query: (filters) => ({
        url: '/profit/trends',
        params: filters,
      }),
      providesTags: ['Profit'],
      keepUnusedDataFor: 30,
    }),
  }),
})

// ============================================
// EXPORTED HOOKS
// ============================================

export const {
  useGetProfitSummaryQuery,
  useGetProfitByProductQuery,
  useGetProfitByMarketplaceQuery,
  useGetProfitTrendsQuery,
  // Lazy queries for manual fetching
  useLazyGetProfitSummaryQuery,
  useLazyGetProfitByProductQuery,
  useLazyGetProfitByMarketplaceQuery,
  useLazyGetProfitTrendsQuery,
} = profitApi
