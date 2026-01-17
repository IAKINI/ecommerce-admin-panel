'use client';

import { useEffect, useState } from 'react';
import { Package, ShoppingCart, TrendingUp, AlertTriangle, Clock, DollarSign } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import SalesChart from '@/components/dashboard/SalesChart';
import RecentOrders from '@/components/dashboard/RecentOrders';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { DataService } from '@/lib/dataService';
import { DashboardStats, SalesData, Order } from '@/lib/types';

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Initialize data service
        DataService.initialize();

        // Load all dashboard data
        const [dashboardStats, salesChartData, orders] = await Promise.all([
          DataService.getDashboardStats(),
          DataService.getSalesData('weekly'),
          DataService.getOrders()
        ]);

        setStats(dashboardStats);
        setSalesData(salesChartData);
        setRecentOrders(orders.slice(0, 5));
      } catch (error) {
        console.error('Dashboard veri yükleme hatası:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Veri yüklenirken hata oluştu</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">E-ticaret yönetim paneline hoş geldiniz</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <StatsCard
          title="Toplam Ürün"
          value={stats.totalProducts}
          icon={<Package size={24} />}
        />
        <StatsCard
          title="Aktif Sipariş"
          value={stats.activeOrders}
          icon={<ShoppingCart size={24} />}
        />
        <StatsCard
          title="Günlük Satış"
          value={stats.dailySales}
          icon={<TrendingUp size={24} />}
          format="currency"
        />
        <StatsCard
          title="Toplam Gelir"
          value={stats.totalRevenue}
          icon={<DollarSign size={24} />}
          format="currency"
        />
        <StatsCard
          title="Düşük Stok"
          value={stats.lowStockProducts}
          icon={<AlertTriangle size={24} />}
        />
        <StatsCard
          title="Bekleyen Sipariş"
          value={stats.pendingOrders}
          icon={<Clock size={24} />}
        />
      </div>

      {/* Charts and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart data={salesData} />
        <RecentOrders orders={recentOrders} />
      </div>
    </div>
  );
}