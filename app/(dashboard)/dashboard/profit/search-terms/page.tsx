import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitSearchTermsPage() {
  return (
    <Container>
      <PageHeader title="Search Terms" description="Identify profitable search terms and keywords." />
      <EmptyState
        title="Search terms coming soon"
        description="Search term profitability insights will appear here."
      />
    </Container>
  )
}

