'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from '@/design-system/loaders'

const RepricerDashboardScreen = dynamic(
  () => import('@/features/repricer/RepricerDashboardScreen').then((m) => m.RepricerDashboardScreen),
  {
    ssr: false,
    loading: () => (
      <div className="p-6 space-y-4">
        <Skeleton width={200} height={32} />
        <Skeleton width="100%" height={120} />
        <Skeleton width="100%" height={320} />
      </div>
    ),
  }
)

/**
 * Repricer Dashboard Page (lazy-loaded for better initial load)
 */
export default function RepricerPage() {
  return <RepricerDashboardScreen />
}
