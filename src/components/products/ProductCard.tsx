'use client';

import { Product } from '@/lib/types';
import Button from '@/components/ui/Button';
import { Edit, Trash2, Package } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { text: 'Stokta Yok', color: 'text-red-600 bg-red-50' };
    if (stock < 10) return { text: 'Düşük Stok', color: 'text-yellow-600 bg-yellow-50' };
    return { text: 'Stokta Var', color: 'text-green-600 bg-green-50' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-500">Kategori:</span>
            <span className="text-sm font-medium text-gray-700">{product.category}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <Package size={16} className="text-gray-400" />
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${stockStatus.color}`}>
            {stockStatus.text}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-bold text-gray-900">{formatCurrency(product.price)}</p>
          <p className="text-sm text-gray-500">Stok: {product.stock} adet</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onEdit}
          >
            <Edit size={16} className="mr-1" />
            Düzenle
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={onDelete}
          >
            <Trash2 size={16} className="mr-1" />
            Sil
          </Button>
        </div>
      </div>
    </div>
  );
}