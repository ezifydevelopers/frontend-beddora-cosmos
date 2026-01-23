import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitReportsPage() {
  return (
    <Container>
      <PageHeader title="Profit Reports" description="Export and schedule profit reports." />
      <EmptyState title="Profit reports coming soon" description="Reporting tools will appear here." />
    </Container>
  )
}

