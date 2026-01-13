'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppSelector } from '@/store/hooks'

/**
 * Protected route component
 * Redirects to login if user is not authenticated
 * 
 * Usage:
 * <ProtectedRoute>
 *   <YourComponent />
 * </ProtectedRoute>
 */
export interface ProtectedRouteProps {
  children: React.ReactNode
  requireEmailVerification?: boolean
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireEmailVerification = true,
}) => {
  const router = useRouter()
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    if (requireEmailVerification && user && !user.emailVerified) {
      router.push('/verify-email')
      return
    }
  }, [isAuthenticated, user, requireEmailVerification, router])

  if (!isAuthenticated) {
    return null
  }

  if (requireEmailVerification && user && !user.emailVerified) {
    return null
  }

  return <>{children}</>
}
