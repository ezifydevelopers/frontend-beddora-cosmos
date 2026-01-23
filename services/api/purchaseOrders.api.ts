import { baseApi } from './baseApi'
import {
  PurchaseOrderCreateRequest,
  PurchaseOrderDuplicateRequest,
  PurchaseOrderFilters,
  PurchaseOrderListResponse,
  PurchaseOrderUpdateRequest,
  PurchaseOrder,
  InboundShipmentFilters,
  InboundShipmentResponse,
  InboundShipmentUpdateRequest,
  POAlertsResponse,
} from '@/types/purchaseOrders.types'

export const purchaseOrdersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseOrders: builder.query<PurchaseOrderListResponse, PurchaseOrderFilters>({
      query: (filters) => ({
        url: '/purchase-orders',
        params: filters,
      }),
      providesTags: ['PurchaseOrders'],
      keepUnusedDataFor: 30,
      transformResponse: (response: { success: boolean; data: PurchaseOrderListResponse }) => response.data,
    }),
    getPurchaseOrderById: builder.query<PurchaseOrder, { id: string; accountId: string }>({
      query: ({ id, accountId }) => ({
        url: `/purchase-orders/${id}`,
        params: { accountId },
      }),
      providesTags: (result, error, { id }) => [{ type: 'PurchaseOrders', id }],
      keepUnusedDataFor: 30,
      transformResponse: (response: { success: boolean; data: PurchaseOrder }) => response.data,
    }),
    createPurchaseOrder: builder.mutation<PurchaseOrder, PurchaseOrderCreateRequest>({
      query: (payload) => ({
        url: '/purchase-orders',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['PurchaseOrders'],
      transformResponse: (response: { success: boolean; data: PurchaseOrder }) => response.data,
    }),
    updatePurchaseOrder: builder.mutation<
      PurchaseOrder,
      { id: string; payload: PurchaseOrderUpdateRequest }
    >({
      query: ({ id, payload }) => ({
        url: `/purchase-orders/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'PurchaseOrders', id }, 'PurchaseOrders'],
      transformResponse: (response: { success: boolean; data: PurchaseOrder }) => response.data,
    }),
    deletePurchaseOrder: builder.mutation<void, { id: string; accountId: string }>({
      query: ({ id, accountId }) => ({
        url: `/purchase-orders/${id}`,
        method: 'DELETE',
        params: { accountId },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'PurchaseOrders', id }, 'PurchaseOrders'],
    }),
    duplicatePurchaseOrder: builder.mutation<
      PurchaseOrder,
      { id: string; payload: PurchaseOrderDuplicateRequest }
    >({
      query: ({ id, payload }) => ({
        url: `/purchase-orders/${id}/duplicate`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['PurchaseOrders'],
      transformResponse: (response: { success: boolean; data: PurchaseOrder }) => response.data,
    }),
    getPurchaseOrderAlerts: builder.query<POAlertsResponse, PurchaseOrderFilters>({
      query: (filters) => ({
        url: '/purchase-orders/alerts',
        params: filters,
      }),
      providesTags: ['PurchaseOrders'],
      keepUnusedDataFor: 30,
      transformResponse: (response: { success: boolean; data: POAlertsResponse }) => response.data,
    }),
    getInboundShipments: builder.query<InboundShipmentResponse, InboundShipmentFilters>({
      query: (filters) => ({
        url: '/inbound-shipments',
        params: filters,
      }),
      providesTags: ['InboundShipments'],
      keepUnusedDataFor: 30,
      transformResponse: (response: { success: boolean; data: InboundShipmentResponse }) => response.data,
    }),
    updateInboundShipment: builder.mutation<
      InboundShipmentResponse['data'][number],
      { id: string; payload: InboundShipmentUpdateRequest }
    >({
      query: ({ id, payload }) => ({
        url: `/inbound-shipments/${id}`,
        method: 'PATCH',
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'InboundShipments', id }, 'InboundShipments'],
      transformResponse: (response: { success: boolean; data: InboundShipmentResponse['data'][number] }) =>
        response.data,
    }),
  }),
})

export const {
  useGetPurchaseOrdersQuery,
  useGetPurchaseOrderByIdQuery,
  useCreatePurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useDuplicatePurchaseOrderMutation,
  useGetPurchaseOrderAlertsQuery,
  useGetInboundShipmentsQuery,
  useUpdateInboundShipmentMutation,
} = purchaseOrdersApi

