'use client'

import React from 'react'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * LineChart component - Pure UI component
 * 
 * Usage:
 * <LineChart data={data} xKey="date" yKey="value" />
 */

export interface LineChartData {
  [key: string]: string | number
}

export interface LineChartProps {
  data: LineChartData[]
  xKey: string
  yKeys: Array<{ key: string; name: string; color?: string }>
  height?: number
  className?: string
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  xKey,
  yKeys,
  height = 300,
  className,
}) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          {yKeys.map((yKey) => (
            <Line
              key={yKey.key}
              type="monotone"
              dataKey={yKey.key}
              name={yKey.name}
              stroke={yKey.color || '#0ea5e9'}
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  )
}

