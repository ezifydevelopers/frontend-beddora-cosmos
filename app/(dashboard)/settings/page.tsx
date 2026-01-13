'use client'

import React from 'react'
import { PageHeader } from '@/components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/design-system/cards'
import { Input } from '@/design-system/inputs'
import { Button } from '@/design-system/buttons'

/**
 * Settings page
 * 
 * Add your settings form and logic here
 */
export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        description="Manage your account settings"
      />

      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-w-md">
            <Input label="Email" type="email" defaultValue="user@example.com" />
            <Input label="Name" type="text" defaultValue="John Doe" />
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

