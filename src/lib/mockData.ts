import { Product, Order, DashboardStats, SalesData } from './types';
import { sampleProducts, sampleOrders } from '@/data/sampleData';
import { StorageService } from './storage';

export class MockDataService {
  static initializeSampleData(): void {
    // Initialize with sample data if no data exists
    const existingProducts = StorageService.loadProducts();
    const existingOrders = StorageService.loadOrders();

    if (existingProducts.length === 0) {
      StorageService.saveProducts(sampleProducts);
    }

    if (existingOrders.length === 0) {
      StorageService.saveOrders(sampleOrders);
    }
  }

  static generateDashboardStats(): DashboardStats {
    const products = StorageService.loadProducts();
    const orders = StorageService.loadOrders();

    const activeOrders = orders.filter(order => 
      order.status === 'pending' || order.status === 'processing' || order.status === 'shipped'
    ).length;

    const pendingOrders = orders.filter(order => order.status === 'pending').length;
    const lowStockProducts = products.filter(product => product.stock < 10).length;

    // Calculate daily sales (today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.orderDate);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    });

    const dailySales = todayOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalRevenue = orders
      .filter(order => order.status === 'delivered')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    return {
      totalProducts: products.length,
      activeOrders,
      dailySales,
      totalRevenue,
      lowStockProducts,
      pendingOrders
    };
  }

  static generateSalesData(days: number = 7): SalesData[] {
    const orders = StorageService.loadOrders();
    const salesData: SalesData[] = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === date.getTime();
      });

      const revenue = dayOrders.reduce((sum, order) => sum + order.totalAmount, 0);
      const sales = dayOrders.reduce((sum, order) => 
        sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
      );

      salesData.push({
        date: date.toISOString().split('T')[0],
        sales,
        orders: dayOrders.length,
        revenue
      });
    }

    return salesData;
  }

  static generateRandomProduct(): Product {
    const categories = ['Elektronik', 'Bilgisayar', 'Tablet', 'Ses & Görüntü', 'Aksesuar'];
    const names = ['Premium Ürün', 'Yeni Model', 'Özel Seri', 'Pro Versiyon', 'Standart Model'];
    
    const id = Date.now().toString();
    const name = names[Math.floor(Math.random() * names.length)] + ' ' + id.slice(-3);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 50000) + 1000;
    const stock = Math.floor(Math.random() * 100) + 1;

    return {
      id,
      name,
      description: `${name} - Yüksek kaliteli ${category.toLowerCase()} ürünü`,
      price,
      stock,
      category,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
  }

  static generateRandomOrder(): Order {
    const products = StorageService.loadProducts();
    const customerNames = ['Ali Veli', 'Ayşe Fatma', 'Mehmet Can', 'Zeynep Nur', 'Emre Kaan'];
    const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya'];
    
    const id = Date.now().toString();
    const orderNumber = `ORD-2024-${id.slice(-3)}`;
    const customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    
    // Random 1-3 items
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const items = [];
    let totalAmount = 0;

    for (let i = 0; i < itemCount; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const quantity = Math.floor(Math.random() * 3) + 1;
      
      items.push({
        productId: product.id,
        productName: product.name,
        quantity,
        price: product.price
      });
      
      totalAmount += product.price * quantity;
    }

    const statuses: Array<'pending' | 'processing' | 'shipped' | 'delivered'> = 
      ['pending', 'processing', 'shipped', 'delivered'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id,
      orderNumber,
      customerName,
      customerEmail: `${customerName.toLowerCase().replace(' ', '.')}@example.com`,
      items,
      totalAmount,
      status,
      orderDate: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      shippingAddress: city,
      notes: Math.random() > 0.5 ? 'Özel teslimat talebi' : ''
    };
  }
}