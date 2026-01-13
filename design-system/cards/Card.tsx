'use client'

import React from 'react'
import { cn } from '@/utils/cn'

/**
 * Card component - Pure UI component
 * 
 * Usage:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>Content here</CardContent>
 * </Card>
 */

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-secondary-200 shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('px-6 py-4 border-b border-secondary-200', className)}
      {...props}
    />
  )
}

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <h3
      className={cn('text-lg font-semibold text-secondary-900', className)}
      {...props}
    />
  )
}

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('px-6 py-4', className)} {...props} />
  )
}

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('px-6 py-4 border-t border-secondary-200', className)}
      {...props}
    />
  )
}

