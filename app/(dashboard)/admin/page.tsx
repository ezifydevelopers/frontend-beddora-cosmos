'use client'

import React from 'react'
import { PageHeader } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/cards'
import { EmptyState } from '@/components/data-display'

/**
 * Admin page
 * 
 * Add admin functionality here
 */
export default function AdminPage() {
  return (
    <div>
      <PageHeader
        title="Admin"
        description="Administrative panel"
      />

      <Card>
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="Admin features"
            description="Add admin functionality here"
          />
        </CardContent>
      </Card>
    </div>
  )
}

