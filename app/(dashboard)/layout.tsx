'use client'

import React, { useMemo } from 'react'
import { Sidebar, Header, ProtectedRoute } from '@/components/navigation'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { clearCredentials } from '@/store/auth.slice'
import { useLogoutMutation } from '@/services/api/auth.api'
import { useRouter } from 'next/navigation'

/**
 * Dashboard layout
 * Provides sidebar and header for all dashboard pages
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.auth.user)
  const refreshToken = useAppSelector((state) => state.auth.refreshToken)
  const [logout] = useLogoutMutation()

  const navItems = useMemo(() => [
    { label: 'Dashboard', href: '/dashboard', icon: null },
    { label: 'Profit', href: '/dashboard/profit', icon: null },
    { label: 'Inventory', href: '/dashboard/inventory', icon: null },
    { label: 'PPC', href: '/dashboard/ppc', icon: null },
    { label: 'Alerts', href: '/dashboard/alerts', icon: null },
    { label: 'Settings', href: '/dashboard/settings', icon: null },
    { label: 'Admin', href: '/dashboard/admin', icon: null },
  ], [])

  const handleLogout = React.useCallback(async () => {
    try {
      if (refreshToken) {
        await logout({ refreshToken }).unwrap()
      }
    } catch (error) {
      console.error('Logout error', error)
    } finally {
      dispatch(clearCredentials())
      router.push('/login')
    }
  }, [dispatch, router, refreshToken, logout])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-secondary-50">
        <Sidebar items={navItems} />
        <div className="lg:pl-64">
          <Header user={user || undefined} onLogout={handleLogout} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

