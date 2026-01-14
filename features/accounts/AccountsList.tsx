'use client'

import React from 'react'
import {
  useGetAmazonAccountsQuery,
  useDeleteAmazonAccountMutation,
  useSwitchAmazonAccountMutation,
  AmazonAccount,
} from '@/services/api/accounts.api'
import { Button } from '@/design-system/buttons'
import { Card } from '@/design-system/cards'
import { Spinner } from '@/design-system/loaders'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setActiveAmazonAccount, removeAmazonAccount } from '@/store/accounts.slice'
import { Badge } from '@/design-system/badges'

/**
 * AccountsList Component
 * 
 * Displays all linked Amazon Seller Central accounts
 * Features:
 * - List all linked accounts with marketplace and seller ID
 * - Switch active account
 * - Delete/unlink accounts
 * - Visual indication of active account
 */
export const AccountsList: React.FC = () => {
  const { data: accounts, isLoading, error } = useGetAmazonAccountsQuery()
  const [deleteAccount, { isLoading: isDeleting }] = useDeleteAmazonAccountMutation()
  const [switchAccount, { isLoading: isSwitching }] = useSwitchAmazonAccountMutation()
  const dispatch = useAppDispatch()
  const activeAmazonAccountId = useAppSelector((state) => state.accounts.activeAmazonAccountId)

  /**
   * Handle account deletion
   * Shows confirmation dialog before deleting
   */
  const handleDelete = async (id: string, marketplace: string) => {
    if (!confirm(`Are you sure you want to unlink the ${marketplace} account? This action cannot be undone.`)) {
      return
    }

    try {
      await deleteAccount(id).unwrap()
      dispatch(removeAmazonAccount(id))
    } catch (err: any) {
      alert(err?.data?.error || 'Failed to unlink account')
    }
  }

  /**
   * Handle account switching
   * Updates both backend session and frontend state
   */
  const handleSwitch = async (account: AmazonAccount) => {
    if (activeAmazonAccountId === account.id) {
      return // Already active
    }

    try {
      const result = await switchAccount(account.id).unwrap()
      dispatch(setActiveAmazonAccount(result.id))
    } catch (err: any) {
      alert(err?.data?.error || 'Failed to switch account')
    }
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <Spinner />
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">
          Failed to load accounts. Please try again later.
        </div>
      </Card>
    )
  }

  if (!accounts || accounts.length === 0) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg mb-4">No linked Amazon accounts found.</p>
          <p className="text-gray-400 text-sm">
            Link your first Amazon Seller Central account to get started.
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Linked Amazon Accounts</h2>
        <Badge variant="info">{accounts.length} account{accounts.length !== 1 ? 's' : ''}</Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marketplace
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seller ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Linked
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {accounts.map((account) => {
              const isActive = activeAmazonAccountId === account.id
              const isAccountActive = account.isActive

              return (
                <tr
                  key={account.id}
                  className={isActive ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-50'}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{account.marketplace}</span>
                      {isActive && (
                        <Badge variant="success" className="ml-2">
                          Active
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900 font-mono">{account.sellerId}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant={isAccountActive ? 'success' : 'danger'}>
                      {isAccountActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(account.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant={isActive ? 'primary' : 'outline'}
                        size="sm"
                        onClick={() => handleSwitch(account)}
                        disabled={isActive || isSwitching}
                      >
                        {isActive ? 'Selected' : 'Select'}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(account.id, account.marketplace)}
                        disabled={isDeleting}
                      >
                        Unlink
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
