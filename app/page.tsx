import { redirect } from 'next/navigation'

/**
 * Root page - redirects to dashboard
 * In a real app, you might check authentication here
 */
export default function Home() {
  redirect('/dashboard')
}

