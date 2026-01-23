"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/cards'
import { PieChart, ChartPalette } from '@/design-system/charts'
import { ProfitSummary } from '@/services/api/profit.api'
import { AdvertisingCostKPI } from '@/services/api/kpis.api'
import { Spinner } from '@/design-system/loaders'

export interface CostBreakdownChartProps {
  summary?: ProfitSummary
  ppcData?: AdvertisingCostKPI
  isLoading?: boolean
  error?: any
  title?: string
}

export const CostBreakdownChart: React.FC<CostBreakdownChartProps> = ({
  summary,
  ppcData,
  isLoading,
  error,
  title = 'Cost Breakdown',
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Spinner />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-danger-600">Failed to load cost breakdown</div>
        </CardContent>
      </Card>
    )
  }

  if (!summary) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-text-muted">No cost data available</div>
        </CardContent>
      </Card>
    )
  }

  const data = [
    { name: 'COGS', value: summary.totalCOGS, color: ChartPalette.primary },
    { name: 'Amazon Fees', value: summary.totalFees, color: ChartPalette.warning },
    { name: 'PPC', value: ppcData?.totalSpend || 0, color: ChartPalette.danger },
    { name: 'Other', value: summary.totalExpenses, color: ChartPalette.accent },
  ].filter((entry) => entry.value > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="text-sm text-text-muted">No cost data available</div>
        ) : (
          <PieChart data={data} height={280} />
        )}
      </CardContent>
    </Card>
  )
}

