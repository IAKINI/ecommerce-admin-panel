// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  imageUrl?: string;
}

// Order Types
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: Date;
  shippingAddress: string;
  notes?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalProducts: number;
  activeOrders: number;
  dailySales: number;
  totalRevenue: number;
  lowStockProducts: number;
  pendingOrders: number;
}

export interface SalesData {
  date: string;
  sales: number;
  orders: number;
  revenue: number;
}

export interface DashboardData {
  stats: DashboardStats;
  salesChart: SalesData[];
  recentOrders: Order[];
  topProducts: Product[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// UI Component Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}