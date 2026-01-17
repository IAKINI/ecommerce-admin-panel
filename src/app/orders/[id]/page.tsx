'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, User, MapPin, Calendar, CreditCard } from 'lucide-react';
import { Order, OrderStatus } from '@/lib/types';
import { DataService } from '@/lib/dataService';
import { orderStatuses } from '@/data/sampleData';
import Button from '@/components/ui/Button';
import StatusBadge from '@/components/ui/StatusBadge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
  }, [params.id]);

  const loadOrder = async () => {
    try {
      DataService.initialize();
      const data = await DataService.getOrder(params.id);
      if (data) {
        setOrder(data);
      } else {
        alert('Sipariş bulunamadı');
        router.push('/orders');
      }
    } catch (error) {
      console.error('Sipariş yükleme hatası:', error);
      alert('Sipariş yüklenirken hata oluştu');
      router.push('/orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: OrderStatus) => {
    if (!order) return;
    
    setUpdating(true);
    
    try {
      const result = await DataService.updateOrderStatus(order.id, newStatus);
      if (result.success) {
        setOrder(prev => prev ? { ...prev, status: newStatus } : null);
      } else {
        alert(result.error || 'Sipariş durumu güncellenirken hata oluştu');
      }
    } catch (error) {
      console.error('Sipariş durumu güncelleme hatası:', error);
      alert('Sipariş durumu güncellenirken hata oluştu');
    } finally {
      setUpdating(false);
    }
  };

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
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Sipariş bulunamadı</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/orders')}
          >
            <ArrowLeft size={16} className="mr-1" />
            Geri
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
            <p className="text-gray-600">Sipariş detayları</p>
          </div>
          <StatusBadge status={order.status} size="lg" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center gap-2 mb-6">
              <Package size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Sipariş Ürünleri</h2>
            </div>
            
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.productName}</h3>
                    <p className="text-sm text-gray-600">Birim Fiyat: {formatCurrency(item.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">x{item.quantity}</p>
                    <p className="text-sm text-gray-600">
                      {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Toplam Tutar:</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <User size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Müşteri Bilgileri</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Ad Soyad</p>
                <p className="font-medium text-gray-900">{order.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">E-posta</p>
                <p className="font-medium text-gray-900">{order.customerEmail}</p>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Teslimat Bilgileri</h2>
            </div>
            <div>
              <p className="text-sm text-gray-600">Adres</p>
              <p className="font-medium text-gray-900">{order.shippingAddress}</p>
            </div>
            {order.notes && (
              <div className="mt-3">
                <p className="text-sm text-gray-600">Notlar</p>
                <p className="font-medium text-gray-900">{order.notes}</p>
              </div>
            )}
          </div>

          {/* Order Info */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <Calendar size={20} className="text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-900">Sipariş Bilgileri</h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Sipariş Tarihi</p>
                <p className="font-medium text-gray-900">{formatDate(order.orderDate)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Sipariş Durumu</p>
                <div className="mt-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(e.target.value as OrderStatus)}
                    disabled={updating}
                    className="input-field"
                  >
                    {orderStatuses.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}