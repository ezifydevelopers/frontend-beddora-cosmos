'use client'

import React from 'react'
import { LoginForm } from '@/features/auth'
import { Container } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/cards'

/**
 * Login page
 */
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <Container size="sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  )
}
