'use client';

import { useState } from 'react';
import { Product, ProductFormData } from '@/lib/types';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { categories } from '@/data/sampleData';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: ProductFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, loading = false }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price?.toString() || '',
    stock: product?.stock?.toString() || '',
    category: product?.category || categories[0],
    imageUrl: product?.imageUrl || ''
  });

  const [errors, setErrors] = useState<Partial<ProductFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ProductFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ürün adı gereklidir';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Ürün açıklaması gereklidir';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Fiyat gereklidir';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Geçerli bir fiyat giriniz';
    }

    if (!formData.stock.trim()) {
      newErrors.stock = 'Stok miktarı gereklidir';
    } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = 'Geçerli bir stok miktarı giriniz';
    }

    if (!formData.category) {
      newErrors.category = 'Kategori seçiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const updateField = (field: keyof ProductFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ürün Adı *
        </label>
        <Input
          value={formData.name}
          onChange={(value) => updateField('name', value)}
          placeholder="Ürün adını giriniz"
          className={errors.name ? 'border-red-300 focus:ring-red-500' : ''}
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Açıklama *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Ürün açıklamasını giriniz"
          rows={3}
          className={`input-field ${errors.description ? 'border-red-300 focus:ring-red-500' : ''}`}
        />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fiyat (₺) *
          </label>
          <Input
            type="number"
            value={formData.price}
            onChange={(value) => updateField('price', value)}
            placeholder="0"
            className={errors.price ? 'border-red-300 focus:ring-red-500' : ''}
          />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Stok Miktarı *
          </label>
          <Input
            type="number"
            value={formData.stock}
            onChange={(value) => updateField('stock', value)}
            placeholder="0"
            className={errors.stock ? 'border-red-300 focus:ring-red-500' : ''}
          />
          {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kategori *
        </label>
        <select
          value={formData.category}
          onChange={(e) => updateField('category', e.target.value)}
          className={`input-field ${errors.category ? 'border-red-300 focus:ring-red-500' : ''}`}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Resim URL (İsteğe bağlı)
        </label>
        <Input
          type="url"
          value={formData.imageUrl}
          onChange={(value) => updateField('imageUrl', value)}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1"
        >
          {loading ? 'Kaydediliyor...' : (product ? 'Güncelle' : 'Kaydet')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={loading}
        >
          İptal
        </Button>
      </div>
    </form>
  );
}