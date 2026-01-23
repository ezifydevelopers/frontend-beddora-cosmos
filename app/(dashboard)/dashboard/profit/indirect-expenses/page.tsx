import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitIndirectExpensesPage() {
  return (
    <Container>
      <PageHeader title="Indirect Expenses" description="Review indirect and overhead expenses." />
      <EmptyState
        title="Indirect expenses coming soon"
        description="Indirect expense tracking will appear here."
      />
    </Container>
  )
}

