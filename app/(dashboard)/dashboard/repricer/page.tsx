import { Metadata } from 'next'
import { RepricerDashboardScreen } from '@/features/repricer/RepricerDashboardScreen'

export const metadata: Metadata = {
  title: 'Repricer Dashboard | Beddora',
  description: 'Monitor pricing, competitors, and Buy Box performance',
}

/**
 * Repricer Dashboard Page
 * 
 * Main page for the Repricer feature
 */
export default function RepricerPage() {
  return <RepricerDashboardScreen />
}
