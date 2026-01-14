'use client'

import React, { useState } from 'react'
import { formatCurrency } from '@/utils/format'
import { Container } from '@/components/layout'
import { PageHeader } from '@/components/layout'
import {
  ProfitSummaryCard,
  ProfitBreakdownTable,
  ProfitTrendChart,
  FiltersPanel,
} from './'
import {
  useGetProfitSummaryQuery,
  useGetProfitByProductQuery,
  useGetProfitByMarketplaceQuery,
  useGetProfitTrendsQuery,
  ProfitFilters,
} from '@/services/api/profit.api'
import {
  useGetUnitsSoldKPIQuery,
  useGetReturnsCostKPIQuery,
  useGetAdvertisingCostKPIQuery,
  useGetFBAFeesKPIQuery,
  useGetPayoutEstimateKPIQuery,
  KPIFilters,
} from '@/services/api/kpis.api'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setFilters } from '@/store/profit.slice'
import { setActiveKPI, setKPIFilters } from '@/store/profitKpis.slice'
import { useGetAccountsQuery } from '@/services/api/accounts.api'
import { KPICard, KPITable } from '../kpis'

/**
 * ProfitDashboard component
 * 
 * Main dashboard component for profit analysis
 * Integrates all profit components and provides real-time updates
 * 
 * Features:
 * - Real-time profit summary metrics
 * - Product and marketplace breakdowns
 * - Time-series trend charts
 * - Advanced filtering
 * - Responsive layout
 */
export const ProfitDashboard: React.FC = () => {
  const dispatch = useAppDispatch()
  const profitFilters = useAppSelector((state) => state.profit.filters)
  const kpiFilters = useAppSelector((state) => state.profitKpis.filters)
  const activeKPI = useAppSelector((state) => state.profitKpis.activeKPI)
  const [activeBreakdown, setActiveBreakdown] = useState<'product' | 'marketplace'>('product')

  // Fetch accounts for filter dropdown
  const { data: accountsData } = useGetAccountsQuery()

  // Fetch profit data with current filters
  const {
    data: summaryData,
    isLoading: summaryLoading,
    error: summaryError,
  } = useGetProfitSummaryQuery(profitFilters)

  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useGetProfitByProductQuery(profitFilters)

  const {
    data: marketplaceData,
    isLoading: marketplaceLoading,
    error: marketplaceError,
  } = useGetProfitByMarketplaceQuery(profitFilters)

  const {
    data: trendsData,
    isLoading: trendsLoading,
    error: trendsError,
  } = useGetProfitTrendsQuery(profitFilters)

  // Fetch KPI data
  const kpiQueryFilters: KPIFilters = {
    ...kpiFilters,
    accountId: profitFilters.accountId,
    amazonAccountId: profitFilters.amazonAccountId,
    marketplaceId: profitFilters.marketplaceId,
    sku: profitFilters.sku,
    startDate: profitFilters.startDate,
    endDate: profitFilters.endDate,
  }

  const {
    data: unitsSoldData,
    isLoading: unitsSoldLoading,
    error: unitsSoldError,
  } = useGetUnitsSoldKPIQuery(kpiQueryFilters)

  const {
    data: returnsCostData,
    isLoading: returnsCostLoading,
    error: returnsCostError,
  } = useGetReturnsCostKPIQuery(kpiQueryFilters)

  const {
    data: advertisingCostData,
    isLoading: advertisingCostLoading,
    error: advertisingCostError,
  } = useGetAdvertisingCostKPIQuery(kpiQueryFilters)

  const {
    data: fbaFeesData,
    isLoading: fbaFeesLoading,
    error: fbaFeesError,
  } = useGetFBAFeesKPIQuery(kpiQueryFilters)

  const {
    data: payoutEstimateData,
    isLoading: payoutEstimateLoading,
    error: payoutEstimateError,
  } = useGetPayoutEstimateKPIQuery(kpiQueryFilters)

  // Handle filter changes
  const handleFiltersChange = (newFilters: ProfitFilters) => {
    dispatch(setFilters(newFilters))
    // Sync KPI filters with profit filters
    dispatch(
      setKPIFilters({
        accountId: newFilters.accountId,
        amazonAccountId: newFilters.amazonAccountId,
        marketplaceId: newFilters.marketplaceId,
        sku: newFilters.sku,
        startDate: newFilters.startDate,
        endDate: newFilters.endDate,
        period: newFilters.period || 'day',
      })
    )
  }

  // Handle KPI drill-down
  const handleKPIDrillDown = (kpiType: 'units-sold' | 'returns-cost' | 'advertising-cost' | 'fba-fees' | 'payout-estimate') => {
    dispatch(setActiveKPI(kpiType))
  }

  // Extract marketplaces from accounts
  const marketplaces =
    accountsData?.flatMap((account) =>
      account.marketplaces.map((mp) => ({
        id: mp.id,
        name: mp.name,
        code: mp.code,
      }))
    ) || []

  return (
    <Container>
      <PageHeader
        title="Profit Dashboard"
        description="Real-time profit analysis and financial metrics"
      />

      <div className="space-y-6">
        {/* Filters Panel */}
        <FiltersPanel
          filters={profitFilters}
          onFiltersChange={handleFiltersChange}
          accounts={accountsData?.map((acc) => ({ id: acc.id, name: acc.name })) || []}
          marketplaces={marketplaces}
        />

        {/* Profit Summary */}
        <ProfitSummaryCard
          data={summaryData}
          isLoading={summaryLoading}
          error={summaryError}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <KPICard
            type="units-sold"
            title="Units Sold"
            value={unitsSoldData?.totalUnits || 0}
            subtitle={`${unitsSoldData?.breakdown.length || 0} products`}
            isLoading={unitsSoldLoading}
            error={unitsSoldError}
            onDrillDown={() => handleKPIDrillDown('units-sold')}
            color="blue"
          />
          <KPICard
            type="returns-cost"
            title="Returns Cost"
            value={returnsCostData?.totalReturnsCost || 0}
            subtitle={`${returnsCostData?.totalReturnsCount || 0} returns`}
            isLoading={returnsCostLoading}
            error={returnsCostError}
            onDrillDown={() => handleKPIDrillDown('returns-cost')}
            color="red"
          />
          <KPICard
            type="advertising-cost"
            title="Advertising Cost"
            value={advertisingCostData?.totalSpend || 0}
            subtitle={`ACOS: ${advertisingCostData?.averageACOS ? `${advertisingCostData.averageACOS.toFixed(1)}%` : 'N/A'}`}
            isLoading={advertisingCostLoading}
            error={advertisingCostError}
            onDrillDown={() => handleKPIDrillDown('advertising-cost')}
            color="orange"
          />
          <KPICard
            type="fba-fees"
            title="FBA Fees"
            value={fbaFeesData?.totalFBAFees || 0}
            subtitle={`${fbaFeesData?.breakdown.length || 0} fee types`}
            isLoading={fbaFeesLoading}
            error={fbaFeesError}
            onDrillDown={() => handleKPIDrillDown('fba-fees')}
            color="purple"
          />
          <KPICard
            type="payout-estimate"
            title="Payout Estimate"
            value={payoutEstimateData?.estimatedPayout || 0}
            subtitle={`After ${formatCurrency(payoutEstimateData?.totalDeductions || 0)} deductions`}
            isLoading={payoutEstimateLoading}
            error={payoutEstimateError}
            onDrillDown={() => handleKPIDrillDown('payout-estimate')}
            color="green"
          />
        </div>

        {/* KPI Drill-Down Tables */}
        {activeKPI && (
          <div>
            {activeKPI === 'units-sold' && (
              <KPITable
                type="units-sold"
                unitsSoldData={unitsSoldData}
                isLoading={unitsSoldLoading}
                error={unitsSoldError}
              />
            )}
            {activeKPI === 'returns-cost' && (
              <KPITable
                type="returns-cost"
                returnsCostData={returnsCostData}
                isLoading={returnsCostLoading}
                error={returnsCostError}
              />
            )}
            {activeKPI === 'advertising-cost' && (
              <KPITable
                type="advertising-cost"
                advertisingCostData={advertisingCostData}
                isLoading={advertisingCostLoading}
                error={advertisingCostError}
              />
            )}
            {activeKPI === 'fba-fees' && (
              <KPITable
                type="fba-fees"
                fbaFeesData={fbaFeesData}
                isLoading={fbaFeesLoading}
                error={fbaFeesError}
              />
            )}
            {activeKPI === 'payout-estimate' && (
              <KPITable
                type="payout-estimate"
                payoutEstimateData={payoutEstimateData}
                isLoading={payoutEstimateLoading}
                error={payoutEstimateError}
              />
            )}
            <div className="mt-4">
              <button
                onClick={() => dispatch(setActiveKPI(null))}
                className="px-4 py-2 bg-secondary-200 text-secondary-700 rounded-lg hover:bg-secondary-300 transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        )}

        {/* Profit Trends Chart */}
        <ProfitTrendChart
          data={trendsData}
          isLoading={trendsLoading}
          error={trendsError}
        />

        {/* Breakdown Tabs */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveBreakdown('product')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeBreakdown === 'product'
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            By Product
          </button>
          <button
            onClick={() => setActiveBreakdown('marketplace')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeBreakdown === 'marketplace'
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            By Marketplace
          </button>
        </div>

        {/* Profit Breakdown Table */}
        {activeBreakdown === 'product' ? (
          <ProfitBreakdownTable
            type="product"
            productData={productData}
            isLoading={productLoading}
            error={productError}
          />
        ) : (
          <ProfitBreakdownTable
            type="marketplace"
            marketplaceData={marketplaceData}
            isLoading={marketplaceLoading}
            error={marketplaceError}
          />
        )}
      </div>
    </Container>
  )
}

