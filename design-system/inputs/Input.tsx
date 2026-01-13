'use client'

import React from 'react'
import { cn } from '@/utils/cn'

/**
 * Input component - Pure UI component
 * 
 * Usage:
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   value={value}
 *   onChange={handleChange}
 * />
 */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-3 py-2 border rounded-lg shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
            'disabled:bg-secondary-100 disabled:cursor-not-allowed',
            error
              ? 'border-error-500 focus:ring-error-500 focus:border-error-500'
              : 'border-secondary-300',
            className
          )}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-error-600">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-secondary-500">{helperText}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

