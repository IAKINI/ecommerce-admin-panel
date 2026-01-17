'use client';

import { OrderStatus } from '@/lib/types';
import { orderStatuses } from '@/data/sampleData';

interface StatusBadgeProps {
  status: OrderStatus;
  size?: 'sm' | 'md' | 'lg';
}

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const statusConfig = orderStatuses.find(s => s.value === status);
  
  if (!statusConfig) return null;

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span className={`inline-flex items-center rounded-full font-medium ${statusConfig.color} ${sizeClasses[size]}`}>
      {statusConfig.label}
    </span>
  );
}