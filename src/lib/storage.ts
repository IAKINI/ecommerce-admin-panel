import { Product, Order } from './types';

// Storage keys
export const STORAGE_KEYS = {
  PRODUCTS: 'ecommerce_products',
  ORDERS: 'ecommerce_orders',
  SETTINGS: 'ecommerce_settings',
  LAST_BACKUP: 'ecommerce_last_backup'
} as const;

export class StorageService {
  // Generic storage operations
  static setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  static getItem<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage error:', error);
      return null;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage error:', error);
    }
  }

  // Specific data operations
  static saveProducts(products: Product[]): void {
    this.setItem(STORAGE_KEYS.PRODUCTS, products);
  }

  static loadProducts(): Product[] {
    const products = this.getItem<Product[]>(STORAGE_KEYS.PRODUCTS);
    if (!products) return [];
    
    // Convert date strings back to Date objects
    return products.map(product => ({
      ...product,
      createdAt: new Date(product.createdAt),
      updatedAt: new Date(product.updatedAt)
    }));
  }

  static saveOrders(orders: Order[]): void {
    this.setItem(STORAGE_KEYS.ORDERS, orders);
  }

  static loadOrders(): Order[] {
    const orders = this.getItem<Order[]>(STORAGE_KEYS.ORDERS);
    if (!orders) return [];
    
    // Convert date strings back to Date objects
    return orders.map(order => ({
      ...order,
      orderDate: new Date(order.orderDate)
    }));
  }

  // Backup and restore
  static exportData(): string {
    const data = {
      products: this.loadProducts(),
      orders: this.loadOrders(),
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  }

  static importData(data: string): boolean {
    try {
      const parsed = JSON.parse(data);
      if (parsed.products) {
        this.saveProducts(parsed.products);
      }
      if (parsed.orders) {
        this.saveOrders(parsed.orders);
      }
      return true;
    } catch (error) {
      console.error('Import error:', error);
      return false;
    }
  }
}