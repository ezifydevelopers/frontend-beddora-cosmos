'use client'

import React from 'react'
import { PageHeader } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/cards'
import { EmptyState } from '@/components/data-display'
// import { useGetProfitReportQuery } from '@/services/api/profit.api'

/**
 * Profit page
 * 
 * Business logic: Connect to profit API
 * Example:
 * const { data, isLoading, error } = useGetProfitReportQuery({})
 */
export default function ProfitPage() {
  // const { data, isLoading, error } = useGetProfitReportQuery({})

  return (
    <div>
      <PageHeader
        title="Profit Analysis"
        description="View your profit reports and analytics"
      />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit Report</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              title="No profit data available"
              description="Connect to the profit API to see your profit reports here"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

