import { baseApi } from './baseApi'

/**
 * Profit API endpoints
 * 
 * Add your profit-related API calls here.
 * This includes profit reports, analytics, trends, etc.
 */

export interface ProfitData {
  id: string
  date: string
  revenue: number
  cost: number
  profit: number
  margin: number
}

export interface ProfitReport {
  period: string
  totalRevenue: number
  totalCost: number
  totalProfit: number
  averageMargin: number
  data: ProfitData[]
}

export interface ProfitFilters {
  startDate?: string
  endDate?: string
  productId?: string
  category?: string
}

export const profitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfitReport: builder.query<ProfitReport, ProfitFilters>({
      query: (filters) => ({
        url: '/profit/report',
        params: filters,
      }),
      providesTags: ['Profit'],
    }),
    getProfitTrends: builder.query<ProfitData[], ProfitFilters>({
      query: (filters) => ({
        url: '/profit/trends',
        params: filters,
      }),
      providesTags: ['Profit'],
    }),
    getProfitSummary: builder.query<Omit<ProfitReport, 'data'>, ProfitFilters>({
      query: (filters) => ({
        url: '/profit/summary',
        params: filters,
      }),
      providesTags: ['Profit'],
    }),
  }),
})

export const {
  useGetProfitReportQuery,
  useGetProfitTrendsQuery,
  useGetProfitSummaryQuery,
} = profitApi

