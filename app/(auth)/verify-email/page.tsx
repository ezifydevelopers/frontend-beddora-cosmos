'use client'

import React from 'react'
import { EmailVerification } from '@/features/auth'
import { Container } from '@/components/layout'

/**
 * Email verification page
 */
export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <Container size="sm">
        <EmailVerification />
      </Container>
    </div>
  )
}
