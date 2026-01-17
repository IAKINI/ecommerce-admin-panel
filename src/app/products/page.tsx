'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import { Product } from '@/lib/types';
import { DataService } from '@/lib/dataService';
import { categories } from '@/data/sampleData';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null
  });

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, selectedCategory]);

  const loadProducts = async () => {
    try {
      DataService.initialize();
      const data = await DataService.getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = async () => {
    try {
      const filtered = await DataService.searchProducts(searchTerm, selectedCategory);
      setFilteredProducts(filtered);
    } catch (error) {
      console.error('Ürün filtreleme hatası:', error);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const confirmDelete = async () => {
    if (!deleteModal.product) return;

    try {
      const result = await DataService.deleteProduct(deleteModal.product.id);
      if (result.success) {
        await loadProducts();
        setDeleteModal({ isOpen: false, product: null });
      } else {
        alert(result.error || 'Ürün silinirken hata oluştu');
      }
    } catch (error) {
      console.error('Ürün silme hatası:', error);
      alert('Ürün silinirken hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ürün Yönetimi</h1>
          <p className="text-gray-600">Ürünlerinizi yönetin ve düzenleyin</p>
        </div>
        <Link href="/products/add">
          <Button>
            <Plus size={20} className="mr-2" />
            Yeni Ürün
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Ürün ara..."
                value={searchTerm}
                onChange={setSearchTerm}
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              <option value="all">Tüm Kategoriler</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Filter size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
          <p className="text-gray-600 mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Arama kriterlerinize uygun ürün bulunamadı.' 
              : 'Henüz hiç ürün eklenmemiş.'}
          </p>
          <Link href="/products/add">
            <Button>
              <Plus size={20} className="mr-2" />
              İlk Ürünü Ekle
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => window.location.href = `/products/${product.id}/edit`}
              onDelete={() => handleDeleteProduct(product)}
            />
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        title="Ürünü Sil"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            <strong>{deleteModal.product?.name}</strong> ürünü silmek istediğinizden emin misiniz? 
            Bu işlem geri alınamaz.
          </p>
          <div className="flex gap-3">
            <Button
              variant="danger"
              onClick={confirmDelete}
              className="flex-1"
            >
              Evet, Sil
            </Button>
            <Button
              variant="secondary"
              onClick={() => setDeleteModal({ isOpen: false, product: null })}
            >
              İptal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}