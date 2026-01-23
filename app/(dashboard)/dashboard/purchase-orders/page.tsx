'use client'

import React, { useEffect } from 'react'
import { Container, PageHeader } from '@/components/layout'
import { Input, Select } from '@/design-system/inputs'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { setPOFilters, setSelectedPOId } from '@/store/inventoryPOs.slice'
import { useGetAccountsQuery } from '@/services/api/accounts.api'
import {
  CreatePurchaseOrderForm,
  POAlerts,
  PurchaseOrderDetail,
  PurchaseOrderTable,
  InboundShipmentTable,
  useFetchPOs,
  useFetchPOById,
  useFetchPOAlerts,
  useFetchInboundShipments,
  useCreatePO,
} from '@/features/inventory/purchase-orders'

export default function PurchaseOrdersPage() {
  const dispatch = useAppDispatch()
  const { filters, selectedPOId } = useAppSelector((state) => state.inventoryPOs)
  const { data: accounts } = useGetAccountsQuery()

  useEffect(() => {
    if (!filters.accountId && accounts?.length) {
      dispatch(setPOFilters({ accountId: accounts[0].id }))
    }
  }, [accounts, dispatch, filters.accountId])

  const effectiveFilters = {
    ...filters,
    accountId: filters.accountId || '',
  }

  const { data: poData, isLoading: poLoading, error: poError } = useFetchPOs(effectiveFilters, {
    skip: !effectiveFilters.accountId,
  })

  const { data: poDetail, isLoading: poDetailLoading } = useFetchPOById(
    { id: selectedPOId || '', accountId: effectiveFilters.accountId },
    { skip: !selectedPOId || !effectiveFilters.accountId }
  )

  const { data: poAlerts, isLoading: poAlertsLoading } = useFetchPOAlerts(effectiveFilters, {
    skip: !effectiveFilters.accountId,
  })

  const { data: inboundData, isLoading: inboundLoading } = useFetchInboundShipments(
    { accountId: effectiveFilters.accountId },
    { skip: !effectiveFilters.accountId }
  )

  const [createPO, { isLoading: creatingPO }] = useCreatePO()

  const handleCreate = async (payload: any) => {
    await createPO(payload).unwrap()
  }

  return (
    <Container>
      <PageHeader title="Purchase Orders" description="Manage suppliers, purchase orders, and inbound shipments." />

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            label="Supplier ID"
            value={filters.supplierId || ''}
            onChange={(e) => dispatch(setPOFilters({ supplierId: e.target.value || undefined }))}
          />
          <Input
            label="Marketplace ID"
            value={filters.marketplaceId || ''}
            onChange={(e) => dispatch(setPOFilters({ marketplaceId: e.target.value || undefined }))}
          />
          <Input
            label="SKU"
            value={filters.sku || ''}
            onChange={(e) => dispatch(setPOFilters({ sku: e.target.value || undefined }))}
          />
          <Select
            label="Status"
            options={[
              { label: 'All', value: '' },
              { label: 'Pending', value: 'pending' },
              { label: 'In Transit', value: 'in-transit' },
              { label: 'Received', value: 'received' },
              { label: 'Canceled', value: 'canceled' },
            ]}
            value={filters.status || ''}
            onChange={(e) => dispatch(setPOFilters({ status: e.target.value || undefined }))}
          />
        </div>

        <POAlerts data={poAlerts} isLoading={poAlertsLoading} error={poError} />

        <PurchaseOrderTable
          items={poData?.data}
          isLoading={poLoading}
          error={poError}
          onSelect={(id) => dispatch(setSelectedPOId(id))}
        />

        {selectedPOId && (
          <PurchaseOrderDetail data={poDetail} isLoading={poDetailLoading} />
        )}

        <InboundShipmentTable items={inboundData?.data} isLoading={inboundLoading} />

        <CreatePurchaseOrderForm
          accountId={effectiveFilters.accountId}
          onSubmit={handleCreate}
          isLoading={creatingPO}
        />
      </div>
    </Container>
  )
}

