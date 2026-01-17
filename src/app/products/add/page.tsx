'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ProductFormData } from '@/lib/types';
import { DataService } from '@/lib/dataService';
import ProductForm from '@/components/products/ProductForm';
import Button from '@/components/ui/Button';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: ProductFormData) => {
    setLoading(true);
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        imageUrl: formData.imageUrl,
        isActive: true
      };

      const result = await DataService.createProduct(productData);
      
      if (result.success) {
        router.push('/products');
      } else {
        alert(result.error || 'Ürün eklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Ürün ekleme hatası:', error);
      alert('Ürün eklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/products');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push('/products')}
          >
            <ArrowLeft size={16} className="mr-1" />
            Geri
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
        <p className="text-gray-600">Yeni bir ürün eklemek için aşağıdaki formu doldurun</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="card">
          <ProductForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}