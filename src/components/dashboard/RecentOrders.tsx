'use client';

import { Order } from '@/lib/types';
import StatusBadge from '@/components/ui/StatusBadge';
import Link from 'next/link';

interface RecentOrdersProps {
  orders: Order[];
  limit?: number;
}

export default function RecentOrders({ orders, limit = 5 }: RecentOrdersProps) {
  const recentOrders = orders.slice(0, limit);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Son Siparişler</h3>
          <p className="text-sm text-gray-600">En son gelen siparişler</p>
        </div>
        <Link 
          href="/orders"
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Tümünü Gör
        </Link>
      </div>

      <div className="space-y-4">
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Henüz sipariş bulunmuyor</p>
        ) : (
          recentOrders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{order.orderNumber}</h4>
                  <StatusBadge status={order.status} size="sm" />
                </div>
                <p className="text-sm text-gray-600 mt-1">{order.customerName}</p>
                <p className="text-xs text-gray-500">{formatDate(order.orderDate)}</p>
              </div>
              <div className="text-right ml-4">
                <p className="font-semibold text-gray-900">{formatCurrency(order.totalAmount)}</p>
                <p className="text-xs text-gray-500">{order.items.length} ürün</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}