'use client'

import React from 'react'
import { useListRolesQuery } from '@/services/api/permissions.api'

interface RoleSelectorProps {
  selectedRoleIds: string[]
  onChange: (roleIds: string[]) => void
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRoleIds, onChange }) => {
  const { data: roles } = useListRolesQuery()

  const toggle = (roleId: string) => {
    if (selectedRoleIds.includes(roleId)) {
      onChange(selectedRoleIds.filter((r) => r !== roleId))
    } else {
      onChange([...selectedRoleIds, roleId])
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-semibold text-secondary-900">Roles</div>
      <div className="space-y-1">
        {roles?.map((role) => (
          <label key={role.id} className="flex items-center gap-2 text-sm text-secondary-800">
            <input
              type="checkbox"
              checked={selectedRoleIds.includes(role.id)}
              onChange={() => toggle(role.id)}
            />
            {role.name}
          </label>
        )) || <div className="text-sm text-secondary-600">No roles found.</div>}
      </div>
    </div>
  )
}
