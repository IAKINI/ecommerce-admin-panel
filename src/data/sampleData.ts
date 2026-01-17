import { Product, Order, OrderStatus } from '@/lib/types';

export const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    description: 'Apple iPhone 14 Pro 128GB Space Black - En son teknoloji ile donatılmış premium akıllı telefon',
    price: 34999,
    stock: 25,
    category: 'Elektronik',
    imageUrl: '/images/iphone14pro.jpg',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23',
    description: 'Samsung Galaxy S23 256GB Phantom Black - Güçlü performans ve harika kamera',
    price: 28999,
    stock: 18,
    category: 'Elektronik',
    imageUrl: '/images/galaxys23.jpg',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    isActive: true
  },
  {
    id: '3',
    name: 'MacBook Air M2',
    description: 'Apple MacBook Air 13" M2 Chip 256GB - Ultra hafif ve güçlü laptop',
    price: 42999,
    stock: 12,
    category: 'Bilgisayar',
    imageUrl: '/images/macbook-air.jpg',
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17'),
    isActive: true
  },
  {
    id: '4',
    name: 'Sony WH-1000XM4',
    description: 'Sony WH-1000XM4 Kablosuz Gürültü Önleyici Kulaklık - Premium ses kalitesi',
    price: 8999,
    stock: 35,
    category: 'Ses & Görüntü',
    imageUrl: '/images/sony-headphones.jpg',
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
    isActive: true
  },
  {
    id: '5',
    name: 'iPad Pro 11"',
    description: 'Apple iPad Pro 11" M2 Chip 128GB - Profesyonel tablet deneyimi',
    price: 26999,
    stock: 8,
    category: 'Tablet',
    imageUrl: '/images/ipad-pro.jpg',
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19'),
    isActive: true
  }
];

export const sampleOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    customerName: 'Ahmet Yılmaz',
    customerEmail: 'ahmet@example.com',
    items: [
      {
        productId: '1',
        productName: 'iPhone 14 Pro',
        quantity: 1,
        price: 34999
      }
    ],
    totalAmount: 34999,
    status: 'processing' as OrderStatus,
    orderDate: new Date('2024-01-20'),
    shippingAddress: 'Kadıköy, İstanbul',
    notes: 'Hızlı teslimat talep edildi'
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    customerName: 'Fatma Demir',
    customerEmail: 'fatma@example.com',
    items: [
      {
        productId: '2',
        productName: 'Samsung Galaxy S23',
        quantity: 1,
        price: 28999
      },
      {
        productId: '4',
        productName: 'Sony WH-1000XM4',
        quantity: 1,
        price: 8999
      }
    ],
    totalAmount: 37998,
    status: 'shipped' as OrderStatus,
    orderDate: new Date('2024-01-19'),
    shippingAddress: 'Çankaya, Ankara',
    notes: ''
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    customerName: 'Mehmet Kaya',
    customerEmail: 'mehmet@example.com',
    items: [
      {
        productId: '3',
        productName: 'MacBook Air M2',
        quantity: 1,
        price: 42999
      }
    ],
    totalAmount: 42999,
    status: 'delivered' as OrderStatus,
    orderDate: new Date('2024-01-18'),
    shippingAddress: 'Konak, İzmir',
    notes: 'Ofis adresine teslim edilsin'
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    customerName: 'Ayşe Özkan',
    customerEmail: 'ayse@example.com',
    items: [
      {
        productId: '5',
        productName: 'iPad Pro 11"',
        quantity: 2,
        price: 26999
      }
    ],
    totalAmount: 53998,
    status: 'pending' as OrderStatus,
    orderDate: new Date('2024-01-21'),
    shippingAddress: 'Beşiktaş, İstanbul',
    notes: 'Hediye paketi yapılsın'
  }
];

export const categories = [
  'Elektronik',
  'Bilgisayar',
  'Tablet',
  'Ses & Görüntü',
  'Aksesuar',
  'Ev & Yaşam',
  'Spor & Outdoor'
];

export const orderStatuses: { value: OrderStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Beklemede', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'processing', label: 'Hazırlanıyor', color: 'bg-blue-100 text-blue-800' },
  { value: 'shipped', label: 'Kargoda', color: 'bg-purple-100 text-purple-800' },
  { value: 'delivered', label: 'Teslim Edildi', color: 'bg-green-100 text-green-800' },
  { value: 'cancelled', label: 'İptal Edildi', color: 'bg-red-100 text-red-800' }
];