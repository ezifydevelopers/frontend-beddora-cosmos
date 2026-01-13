'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import { ToastContainer } from '@/components/feedback'
import { AuthInitializer } from '@/components/navigation/AuthInitializer'

/**
 * Providers component
 * Wraps the app with Redux Provider and other global providers
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <AuthInitializer>
        {children}
        <ToastContainer />
      </AuthInitializer>
    </Provider>
  )
}

