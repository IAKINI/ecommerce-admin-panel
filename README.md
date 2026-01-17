# E-ticaret Yönetim Paneli

Modern ve kullanıcı dostu e-ticaret yönetim sistemi. Next.js 14, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

### 📊 Dashboard
- Özet istatistikler (toplam ürün, aktif sipariş, günlük satış)
- Satış trend grafikleri
- Son siparişler listesi
- Responsive tasarım

### 📦 Ürün Yönetimi
- Ürün ekleme, düzenleme ve silme
- Kategori bazlı filtreleme
- Ürün arama özelliği
- Stok durumu takibi
- Form validasyonu

### 🛒 Sipariş Takibi
- Sipariş listesi görüntüleme
- Sipariş durumu güncelleme
- Sipariş detay sayfası
- Müşteri bilgileri
- Arama ve filtreleme

## 🛠️ Teknolojiler

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Grafikler**: Recharts
- **İkonlar**: Lucide React
- **Veri Depolama**: LocalStorage (Mock Data)
- **Test**: Jest, Testing Library, Fast-check

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── layout.tsx         # Ana layout
│   ├── page.tsx           # Dashboard
│   ├── products/          # Ürün sayfaları
│   └── orders/            # Sipariş sayfaları
├── components/            # React bileşenleri
│   ├── ui/               # Temel UI bileşenleri
│   ├── layout/           # Layout bileşenleri
│   ├── dashboard/        # Dashboard bileşenleri
│   ├── products/         # Ürün bileşenleri
│   └── orders/           # Sipariş bileşenleri
├── lib/                  # Utility fonksiyonları
│   ├── types.ts          # TypeScript tipleri
│   ├── storage.ts        # LocalStorage servisi
│   ├── dataService.ts    # Veri servisi
│   └── mockData.ts       # Mock veri üretici
└── data/                 # Örnek veriler
    └── sampleData.ts     # Örnek ürün ve sipariş verileri
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda açın: [http://localhost:3000](http://localhost:3000)

### Diğer Komutlar

```bash
# Production build
npm run build

# Production sunucusu
npm run start

# Linting
npm run lint

# Testler
npm run test

# Test watch modu
npm run test:watch
```

## 📊 Veri Yönetimi

Uygulama mock veri servisi kullanır ve verileri tarayıcının LocalStorage'ında saklar:

- **Ürünler**: Otomatik örnek ürünler yüklenir
- **Siparişler**: Örnek siparişler oluşturulur
- **Kalıcılık**: Veriler sayfa yenilenmelerinde korunur
- **Yedekleme**: Veri export/import özelliği

## 🎨 Tasarım Sistemi

### Renkler
- **Primary**: Mavi tonları (#3b82f6)
- **Gray**: Gri tonları (#6b7280)
- **Success**: Yeşil (#10b981)
- **Warning**: Sarı (#f59e0b)
- **Danger**: Kırmızı (#ef4444)

### Bileşenler
- **Button**: 3 varyant (primary, secondary, danger)
- **Input**: Form giriş alanları
- **Modal**: Popup pencereler
- **StatusBadge**: Durum göstergeleri
- **LoadingSpinner**: Yükleme animasyonu

## 📱 Responsive Tasarım

- **Mobile First**: Mobil cihazlar öncelikli
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Navigation**: Mobilde hamburger menü
- **Grid**: Responsive grid sistemleri

## 🧪 Test Stratejisi

### Birim Testleri
- Component render testleri
- Utility fonksiyon testleri
- Form validasyon testleri

### Property-Based Testleri
- Veri bütünlüğü testleri
- CRUD işlem testleri
- Arama/filtreleme testleri

## 🔧 Geliştirme

### Yeni Özellik Ekleme

1. **Tip tanımları**: `src/lib/types.ts`
2. **Veri servisi**: `src/lib/dataService.ts`
3. **Bileşenler**: `src/components/`
4. **Sayfalar**: `src/app/`

### Kod Standartları

- **TypeScript**: Strict mode aktif
- **ESLint**: Next.js kuralları
- **Prettier**: Kod formatlama
- **Naming**: camelCase (değişkenler), PascalCase (bileşenler)

## 📈 Performans

- **SSR**: Server-side rendering
- **Code Splitting**: Otomatik sayfa bazlı
- **Image Optimization**: Next.js Image bileşeni
- **Bundle Analysis**: `npm run build` ile analiz

## 🔒 Güvenlik

- **XSS Protection**: React otomatik escape
- **CSRF**: Next.js built-in koruması
- **Input Validation**: Form validasyonu
- **Type Safety**: TypeScript tip kontrolü

## 🚀 Deployment

### Vercel (Önerilen)

Bu proje Vercel'de canlıda çalışıyor: **[Demo Linki](https://ecommerce-admin-dashboard.vercel.app)**

Kendi Vercel deployment'ınız için:

1. GitHub'a push yapın
2. [Vercel Dashboard](https://vercel.com/dashboard)'a gidin
3. "New Project" tıklayın
4. GitHub repo'nuzu seçin
5. Deploy edin

```bash
# Alternatif: Vercel CLI ile
npm i -g vercel
vercel --prod
```

### Diğer Platformlar
```bash
npm run build
npm run start
```

### Environment Variables

Production'da kullanılacak environment variables:

- `NEXT_PUBLIC_APP_NAME`: Uygulama adı
- `NEXT_PUBLIC_APP_VERSION`: Versiyon numarası

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 İletişim

Sorularınız için issue açabilir veya e-posta gönderebilirsiniz.

---

**Not**: Bu proje eğitim ve demo amaçlı geliştirilmiştir. Production kullanımı için ek güvenlik ve performans optimizasyonları gerekebilir.