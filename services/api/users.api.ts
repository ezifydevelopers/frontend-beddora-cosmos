import { baseApi } from './baseApi'

/**
 * Users API endpoints
 */

export interface User {
  id: string
  email: string
  name: string | null
  isActive: boolean
  isVerified: boolean
  verifiedAt: string | null
  twoFactorEnabled: boolean
  roles: string[]
  createdAt: string
  updatedAt: string
}

export interface UpdateUserRequest {
  name?: string
  email?: string
}

export interface ChangePasswordRequest {
  currentPassword: string
  newPassword: string
}

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentUser: builder.query<User, void>({
      query: () => '/users/me',
      providesTags: ['Auth'],
    }),
    updateCurrentUser: builder.mutation<User, UpdateUserRequest>({
      query: (data) => ({
        url: '/users/me',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),
    changePassword: builder.mutation<{ message: string }, ChangePasswordRequest>({
      query: (data) => ({
        url: '/users/me/change-password',
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useUpdateCurrentUserMutation,
  useChangePasswordMutation,
} = usersApi
