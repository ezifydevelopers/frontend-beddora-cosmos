'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utils/cn'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
import { setSidebarOpen } from '@/store/ui.slice'

/**
 * Sidebar component - Navigation component
 * Main navigation sidebar for the dashboard
 */

export interface NavItem {
  label: string
  href: string
  icon?: React.ReactNode
}

export interface SidebarProps {
  items: NavItem[]
}

export const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const pathname = usePathname()
  const sidebarOpen = useAppSelector((state) => state.ui.sidebarOpen)
  const dispatch = useAppDispatch()

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-secondary-200 transform transition-transform duration-300 ease-in-out',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200">
            <h2 className="text-xl font-bold text-primary-600">Beddora</h2>
            <button
              onClick={() => dispatch(setSidebarOpen(false))}
              className="lg:hidden text-secondary-500 hover:text-secondary-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-secondary-700 hover:bg-secondary-50'
                  )}
                >
                  {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}

