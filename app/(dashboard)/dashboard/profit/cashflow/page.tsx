import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitCashflowPage() {
  return (
    <Container>
      <PageHeader title="Cashflow" description="Cash inflow and outflow analysis." />
      <EmptyState title="Cashflow coming soon" description="Cashflow analysis will appear here." />
    </Container>
  )
}

