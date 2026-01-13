'use client'

import React from 'react'
import { cn } from '@/utils/cn'

/**
 * Table component - Pure UI component
 * 
 * Usage:
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Email</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>john@example.com</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {}

export const Table: React.FC<TableProps> = ({ className, ...props }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={cn('min-w-full divide-y divide-secondary-200', className)}
        {...props}
      />
    </div>
  )
}

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return (
    <thead className={cn('bg-secondary-50', className)} {...props} />
  )
}

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  className,
  ...props
}) => {
  return (
    <tbody className={cn('bg-white divide-y divide-secondary-200', className)} {...props} />
  )
}

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  className,
  ...props
}) => {
  return (
    <tr
      className={cn('hover:bg-secondary-50 transition-colors', className)}
      {...props}
    />
  )
}

export const TableHead: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return (
    <th
      className={cn(
        'px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider',
        className
      )}
      {...props}
    />
  )
}

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => {
  return (
    <td
      className={cn('px-6 py-4 whitespace-nowrap text-sm text-secondary-900', className)}
      {...props}
    />
  )
}

