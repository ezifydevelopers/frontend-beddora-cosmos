'use client'

import React, { useState } from 'react'
import { Container } from '@/components/layout'
import { Input, Select } from '@/design-system/inputs'
import { Card, CardContent } from '@/design-system/cards'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/design-system/tables'

type RecommendationTab = 'bids' | 'well-performing' | 'poorly-performing' | 'budget' | 'keyword-isolation'

export const RecommendationsScreen = React.memo(() => {
  const [activeTab, setActiveTab] = useState<RecommendationTab>('bids')
  const [searchTerm, setSearchTerm] = useState('')
  const [campaignFilter, setCampaignFilter] = useState('all')

  const tabs = [
    { id: 'bids' as const, label: 'Bids' },
    { id: 'well-performing' as const, label: 'Well performing search terms' },
    { id: 'poorly-performing' as const, label: 'Poorly performing search terms' },
    { id: 'budget' as const, label: 'Budget adjustments' },
    { id: 'keyword-isolation' as const, label: 'Keyword isolation' },
  ]

  return (
    <Container size="full">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text-primary">Recommendations</h1>
      </div>

      {/* Filters Row */}
      <div className="flex items-center gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              type="text"
              placeholder="Search by keyword"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>

        {/* Campaign Filter */}
        <Select
          value={campaignFilter}
          onChange={(e) => setCampaignFilter(e.target.value)}
          options={[
            { value: 'all', label: 'All campaigns' },
            { value: 'campaign-1', label: 'Campaign 1' },
            { value: 'campaign-2', label: 'Campaign 2' },
          ]}
          className="min-w-[200px]"
        />

        {/* Filter Button */}
        <button className="flex items-center gap-2 px-4 py-2 border border-border bg-surface hover:bg-surface-secondary transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border mb-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-3 px-1 border-b-2 transition-colors text-sm ${
                activeTab === tab.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign/Ad group</TableHead>
                <TableHead>Keyword</TableHead>
                <TableHead>Current bid</TableHead>
                <TableHead>Bid recommendation</TableHead>
                <TableHead>PPC sales</TableHead>
                <TableHead>Ad spend</TableHead>
                <TableHead>ACOS</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={8} className="text-center py-12">
                  <div className="text-text-muted">No data available</div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-primary text-white hover:bg-primary-dark transition-colors">
            <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Accept
          </button>
          <button className="px-4 py-2 border border-border bg-surface hover:bg-surface-secondary transition-colors">
            <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Snooze for 30 days
          </button>
        </div>
      </div>
    </Container>
  )
})
