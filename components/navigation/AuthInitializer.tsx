'use client'

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { initializeAuth, setCredentials, updateAccessToken, setLoading } from '@/store/auth.slice'
import { useGetCurrentUserQuery, useRefreshTokenMutation } from '@/services/api/auth.api'
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
  const [refresh, refreshState] = useRefreshTokenMutation()

  // Initialize auth from localStorage
  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(initializeAuth())
  }, [dispatch])

  // Attempt refresh on load if no access token
  useEffect(() => {
    const doRefresh = async () => {
      try {
        dispatch(setLoading(true))
        const result = await refresh().unwrap()
        dispatch(updateAccessToken(result.accessToken))
      } catch {
        // ignore; user will be treated as unauthenticated
      } finally {
        dispatch(setLoading(false))
      }
    }
    if (!accessToken && !refreshState.isLoading && !refreshState.isSuccess) {
      void doRefresh()
    }
    if (accessToken) {
      // If we already have a token, stop loading state
      dispatch(setLoading(false))
    }
  }, [accessToken, refresh, refreshState.isLoading, refreshState.isSuccess, dispatch])

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
      dispatch(
        setCredentials({
          user,
          accessToken,
          accountId: accountId || undefined,
        })
      )
      dispatch(setLoading(false))
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
