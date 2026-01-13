'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useRegisterMutation } from '@/services/api/auth.api'
import { Input } from '@/design-system/inputs'
import { Button } from '@/design-system/buttons'
import Link from 'next/link'

/**
 * Registration form component
 * Includes Terms & Privacy policy acceptance
 */
export const RegisterForm: React.FC = () => {
  const router = useRouter()
  const [register, { isLoading }] = useRegisterMutation()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    acceptTerms: false,
    acceptPrivacy: false,
  })
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.acceptTerms || !formData.acceptPrivacy) {
      setError('You must accept Terms & Conditions and Privacy Policy')
      return
    }

    try {
      const result = await register(formData).unwrap()
      // Redirect to email verification page
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
    } catch (err: any) {
      setError(err.data?.message || err.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        label="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <Input
        type="email"
        label="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <Input
        type="password"
        label="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        helperText="Must be at least 8 characters with uppercase, lowercase, and number"
      />

      <div className="space-y-2">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
            className="mt-1"
            required
          />
          <span className="text-sm">
            I accept the{' '}
            <Link href="/terms" className="text-primary-600 hover:underline" target="_blank">
              Terms & Conditions
            </Link>
          </span>
        </label>

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.acceptPrivacy}
            onChange={(e) => setFormData({ ...formData, acceptPrivacy: e.target.checked })}
            className="mt-1"
            required
          />
          <span className="text-sm">
            I accept the{' '}
            <Link href="/privacy" className="text-primary-600 hover:underline" target="_blank">
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>

      {error && (
        <div className="text-sm text-error-600 bg-error-50 p-3 rounded">
          {error}
        </div>
      )}

      <Button type="submit" className="w-full" isLoading={isLoading}>
        Sign up
      </Button>

      <p className="text-center text-sm text-secondary-600">
        Already have an account?{' '}
        <Link href="/login" className="text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </form>
  )
}
