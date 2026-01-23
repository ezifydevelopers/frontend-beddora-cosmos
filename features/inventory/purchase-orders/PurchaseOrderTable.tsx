'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/cards'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/design-system/tables'
import { Badge } from '@/design-system/badges'
import { Spinner } from '@/design-system/loaders'
import { PurchaseOrder } from '@/types/purchaseOrders.types'
import { formatDate, formatNumber } from '@/utils/format'

export interface PurchaseOrderTableProps {
  items?: PurchaseOrder[]
  isLoading?: boolean
  error?: any
  onSelect?: (id: string) => void
}

const statusVariantMap: Record<string, { label: string; variant: 'success' | 'warning' | 'error' | 'secondary' }> = {
  pending: { label: 'Pending', variant: 'secondary' },
  'in-transit': { label: 'In Transit', variant: 'warning' },
  received: { label: 'Received', variant: 'success' },
  canceled: { label: 'Canceled', variant: 'error' },
}

export const PurchaseOrderTable: React.FC<PurchaseOrderTableProps> = ({
  items,
  isLoading,
  error,
  onSelect,
}) => {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <Spinner />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-danger-600 text-sm">Failed to load purchase orders.</div>
        </CardContent>
      </Card>
    )
  }

  if (!items || items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-text-muted text-sm">No purchase orders found.</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Marketplace</TableHead>
              <TableHead className="text-right">Qty</TableHead>
              <TableHead className="text-right">Total Cost</TableHead>
              <TableHead>ETA</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((po) => {
              const statusConfig = statusVariantMap[po.status] || statusVariantMap.pending
              return (
                <TableRow key={po.id} onClick={() => onSelect?.(po.id)} className="cursor-pointer">
                  <TableCell className="font-medium">{po.poNumber}</TableCell>
                  <TableCell>{po.supplier?.name || '—'}</TableCell>
                  <TableCell>{po.marketplace?.name || 'All'}</TableCell>
                  <TableCell className="text-right">{formatNumber(po.totalQuantity, 0)}</TableCell>
                  <TableCell className="text-right">{formatNumber(po.totalCost, 2)}</TableCell>
                  <TableCell>
                    {po.estimatedDeliveryDate ? formatDate(po.estimatedDeliveryDate) : '—'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusConfig.variant} size="sm">
                      {statusConfig.label}
                    </Badge>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

