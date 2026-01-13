import { baseApi } from './baseApi'

/**
 * Permissions API endpoints
 */

export interface UserPermissions {
  permissions: Record<string, string> // e.g., { "profit.read": "profit.read", "inventory.write": "inventory.write" }
  roles: string[]
}

export interface UpdateUserPermissionsRequest {
  permissions: Array<{
    resource: string
    action: string
    accountId?: string
  }>
}

export const permissionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyPermissions: builder.query<UserPermissions, { accountId?: string } | void>({
      query: (params) => ({
        url: '/permissions/me',
        params: params || {},
      }),
      providesTags: ['Permissions'],
    }),
    updateUserPermissions: builder.mutation<
      { message: string },
      { userId: string; data: UpdateUserPermissionsRequest }
    >({
      query: ({ userId, data }) => ({
        url: `/permissions/${userId}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Permissions'],
    }),
  }),
})

export const {
  useGetMyPermissionsQuery,
  useUpdateUserPermissionsMutation,
} = permissionsApi
