import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitShippingCostsPage() {
  return (
    <Container>
      <PageHeader title="Shipping Costs" description="Track shipping costs and delivery expenses." />
      <EmptyState
        title="Shipping costs coming soon"
        description="Shipping cost analytics will appear here."
      />
    </Container>
  )
}

