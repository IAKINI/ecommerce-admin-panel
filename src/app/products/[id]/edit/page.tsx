'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Product, ProductFormData } from '@/lib/types';
import { DataService } from '@/lib/dataService';
import ProductForm from '@/components/products/ProductForm';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [params.id]);

  const loadProduct = async () => {
    try {
      DataService.initialize();
      const data = await DataService.getProduct(params.id);
      if (data) {
        setProduct(data);
      } else {
        alert('Ürün bulunamadı');
        router.push('/products');
      }
    } catch (error) {
      console.error('Ürün yükleme hatası:', error);
      alert('Ürün yüklenirken hata oluştu');
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData: ProductFormData) => {
    if (!product) return;
    
    setSaving(true);
    
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: formData.category,
        imageUrl: formData.imageUrl
      };

      const result = await DataService.updateProduct(product.id, productData);
      
      if (result.success) {
        router.push('/products');
      } else {
        alert(result.error || 'Ürün güncellenirken hata oluştu');
      }
    } catch (error) {
      console.error('Ürün güncelleme hatası:', error);
      alert('Ürün güncellenirken hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push('/products');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Ürün bulunamadı</p>
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
            onClick={() => router.push('/products')}
          >
            <ArrowLeft size={16} className="mr-1" />
            Geri
          </Button>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Ürün Düzenle</h1>
        <p className="text-gray-600">{product.name} ürününü düzenleyin</p>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <div className="card">
          <ProductForm
            product={product}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={saving}
          />
        </div>
      </div>
    </div>
  );
}