import {
  useGetPurchaseOrdersQuery,
  useGetPurchaseOrderByIdQuery,
  useCreatePurchaseOrderMutation,
  useUpdatePurchaseOrderMutation,
  useDeletePurchaseOrderMutation,
  useGetInboundShipmentsQuery,
  useUpdateInboundShipmentMutation,
  useGetPurchaseOrderAlertsQuery,
  useDuplicatePurchaseOrderMutation,
} from '@/services/api/purchaseOrders.api'

export const useFetchPOs = useGetPurchaseOrdersQuery
export const useFetchPOById = useGetPurchaseOrderByIdQuery
export const useCreatePO = useCreatePurchaseOrderMutation
export const useUpdatePO = useUpdatePurchaseOrderMutation
export const useDeletePO = useDeletePurchaseOrderMutation
export const useFetchInboundShipments = useGetInboundShipmentsQuery
export const useUpdateInboundShipment = useUpdateInboundShipmentMutation
export const useFetchPOAlerts = useGetPurchaseOrderAlertsQuery
export const useDuplicatePO = useDuplicatePurchaseOrderMutation

