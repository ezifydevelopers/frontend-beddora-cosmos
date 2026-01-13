'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { initializeAuth, setCredentials } from '@/store/auth.slice'
import { useGetCurrentUserQuery } from '@/services/api/auth.api'
import { useGetAccountsQuery } from '@/services/api/accounts.api'
import { useGetMyPermissionsQuery } from '@/services/api/permissions.api'
import { setAccounts, setActiveAccount } from '@/store/accounts.slice'
import { setPermissions } from '@/store/permissions.slice'

/**
 * Auth initializer component
 * Loads user data, accounts, and permissions on app start
 * Should be placed in the root layout
 */
export const AuthInitializer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) => state.auth.accessToken)
  const accountId = useAppSelector((state) => state.auth.accountId)

  // Initialize auth from localStorage
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  // Load user data if authenticated
  const { data: user } = useGetCurrentUserQuery(undefined, {
    skip: !accessToken,
  })

  // Load accounts if authenticated
  const { data: accounts } = useGetAccountsQuery(undefined, {
    skip: !accessToken,
  })

  // Load permissions if authenticated
  const { data: permissions } = useGetMyPermissionsQuery(
    { accountId: accountId || undefined },
    {
      skip: !accessToken,
    }
  )

  // Update store when data loads
  useEffect(() => {
    if (user && accessToken) {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        dispatch(
          setCredentials({
            user,
            accessToken,
            refreshToken,
            accountId: accountId || undefined,
          })
        )
      }
    }
  }, [user, accessToken, accountId, dispatch])

  useEffect(() => {
    if (accounts) {
      dispatch(setAccounts(accounts))
      const defaultAccount = accounts.find((acc) => acc.isDefault)
      if (defaultAccount) {
        dispatch(setActiveAccount(defaultAccount))
      }
    }
  }, [accounts, dispatch])

  useEffect(() => {
    if (permissions) {
      dispatch(setPermissions(permissions))
    }
  }, [permissions, dispatch])

  return <>{children}</>
}
