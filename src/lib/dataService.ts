import { Product, Order, OrderStatus, DashboardStats, SalesData, ApiResponse } from './types';
import { StorageService } from './storage';
import { MockDataService } from './mockData';

export class DataService {
  // Initialize data on first load
  static initialize(): void {
    MockDataService.initializeSampleData();
  }

  // Products
  static async getProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return StorageService.loadProducts();
  }

  static async getProduct(id: string): Promise<Product | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const products = StorageService.loadProducts();
    return products.find(p => p.id === id) || null;
  }

  static async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<ApiResponse<Product>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const products = StorageService.loadProducts();
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      products.push(newProduct);
      StorageService.saveProducts(products);
      
      return { success: true, data: newProduct };
    } catch (error) {
      return { success: false, error: 'Ürün eklenirken hata oluştu' };
    }
  }

  static async updateProduct(id: string, productData: Partial<Product>): Promise<ApiResponse<Product>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const products = StorageService.loadProducts();
      const index = products.findIndex(p => p.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Ürün bulunamadı' };
      }
      
      products[index] = {
        ...products[index],
        ...productData,
        updatedAt: new Date()
      };
      
      StorageService.saveProducts(products);
      
      return { success: true, data: products[index] };
    } catch (error) {
      return { success: false, error: 'Ürün güncellenirken hata oluştu' };
    }
  }

  static async deleteProduct(id: string): Promise<ApiResponse<boolean>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const products = StorageService.loadProducts();
      const filteredProducts = products.filter(p => p.id !== id);
      
      if (products.length === filteredProducts.length) {
        return { success: false, error: 'Ürün bulunamadı' };
      }
      
      StorageService.saveProducts(filteredProducts);
      
      return { success: true, data: true };
    } catch (error) {
      return { success: false, error: 'Ürün silinirken hata oluştu' };
    }
  }

  // Orders
  static async getOrders(): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return StorageService.loadOrders();
  }

  static async getOrder(id: string): Promise<Order | null> {
    await new Promise(resolve => setTimeout(resolve, 50));
    const orders = StorageService.loadOrders();
    return orders.find(o => o.id === id) || null;
  }

  static async updateOrderStatus(id: string, status: OrderStatus): Promise<ApiResponse<Order>> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    try {
      const orders = StorageService.loadOrders();
      const index = orders.findIndex(o => o.id === id);
      
      if (index === -1) {
        return { success: false, error: 'Sipariş bulunamadı' };
      }
      
      orders[index].status = status;
      StorageService.saveOrders(orders);
      
      return { success: true, data: orders[index] };
    } catch (error) {
      return { success: false, error: 'Sipariş durumu güncellenirken hata oluştu' };
    }
  }

  // Dashboard
  static async getDashboardStats(): Promise<DashboardStats> {
    await new Promise(resolve => setTimeout(resolve, 150));
    return MockDataService.generateDashboardStats();
  }

  static async getSalesData(timeRange: 'daily' | 'weekly' | 'monthly' = 'weekly'): Promise<SalesData[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const days = timeRange === 'daily' ? 1 : timeRange === 'weekly' ? 7 : 30;
    return MockDataService.generateSalesData(days);
  }

  // Search and filter
  static async searchProducts(query: string, category?: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const products = StorageService.loadProducts();
    let filtered = products;

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }

  static async searchOrders(query: string, status?: OrderStatus): Promise<Order[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const orders = StorageService.loadOrders();
    let filtered = orders;

    if (status && status !== 'all' as any) {
      filtered = filtered.filter(o => o.status === status);
    }

    if (query.trim()) {
      const searchTerm = query.toLowerCase();
      filtered = filtered.filter(o => 
        o.orderNumber.toLowerCase().includes(searchTerm) ||
        o.customerName.toLowerCase().includes(searchTerm) ||
        o.customerEmail.toLowerCase().includes(searchTerm)
      );
    }

    return filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
  }
}