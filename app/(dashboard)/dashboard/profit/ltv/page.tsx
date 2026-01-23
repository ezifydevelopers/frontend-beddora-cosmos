import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitLtvPage() {
  return (
    <Container>
      <PageHeader title="LTV" description="Lifetime value insights for customer cohorts." />
      <EmptyState title="LTV coming soon" description="Lifetime value metrics will appear here." />
    </Container>
  )
}

