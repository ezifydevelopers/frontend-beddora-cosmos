import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitProductsPage() {
  return (
    <Container>
      <PageHeader title="Profit Products" description="Product-level profit insights and comparisons." />
      <EmptyState
        title="Profit products coming soon"
        description="Detailed product profit analysis will appear here."
      />
    </Container>
  )
}

