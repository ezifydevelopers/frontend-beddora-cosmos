'use client'

import React from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { toggleSidebar } from '@/store/ui.slice'
import { AccountSwitcher } from '@/features/account'
import { Button } from '@/design-system/buttons'

/**
 * Header component - Navigation component
 * Top header bar with sidebar toggle, account switcher, and user menu
 */

export interface HeaderProps {
  user?: {
    name: string | null
    email: string
  }
  onLogout?: () => void
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const dispatch = useAppDispatch()
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)

  return (
    <header className="sticky top-0 z-30 h-16 bg-white border-b border-secondary-200">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 text-secondary-600 hover:text-secondary-900 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-secondary-900">Dashboard</h1>
        </div>

        <div className="flex items-center gap-4">
          <AccountSwitcher />
          {user && (
            <div className="hidden sm:flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-secondary-900">{user.name || user.email}</p>
                <p className="text-xs text-secondary-500">{user.email}</p>
              </div>
            </div>
          )}
          {onLogout && (
            <Button variant="ghost" size="sm" onClick={onLogout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

