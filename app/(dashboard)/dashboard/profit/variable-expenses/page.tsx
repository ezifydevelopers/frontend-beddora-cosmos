import React from 'react'
import { Container, PageHeader } from '@/components/layout'
import { EmptyState } from '@/components/data-display/EmptyState'

export default function ProfitVariableExpensesPage() {
  return (
    <Container>
      <PageHeader title="Variable Expenses" description="Monitor variable costs tied to sales activity." />
      <EmptyState
        title="Variable expenses coming soon"
        description="Variable expense analytics will appear here."
      />
    </Container>
  )
}

