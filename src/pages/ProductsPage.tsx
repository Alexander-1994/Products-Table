import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Header, Button, Input, Modal } from '~/components/ui';
import { NewProductForm } from '~/components/features';
import { useAuth } from '~/hooks/useAuth';
import { useProducts } from '~/hooks/useProducts';
import { useToast } from '~/hooks/useToast';
import { TProduct } from '~/types/products';

export const ProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [search, setSearch] = useState('');

  const { toast } = useToast();

  const { user, initAuth, signOut, loading: isAuthLoading } = useAuth();
  const {
    items,
    sortBy,
    sortDirection,
    loading: isProductsLoading,
    handleProductsLoad,
    handleProductCreate,
    handleSearchUpdate,
    handleSortUpdate,
  } = useProducts();

  useEffect(() => {
    handleProductsLoad();
  }, []);

  const sortedProducts = useMemo(() => {
    return items
      .filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.vendor.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;

        return 0;
      });
  }, [items, search, sortBy, sortDirection]);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  useEffect(() => {
    initAuth();
  }, []);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate('/login');
    }
  }, [isAuthLoading, user, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Header
          name={user.firstName}
          onProductAdd={() => setShowAddForm(true)}
          onLogout={handleLogout}
        />
      )}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-end">
            <div className="flex-1 min-w-0">
              <Input
                label="Поиск по товарам"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Название или производитель..."
                className="text-lg"
              />
            </div>
            <Button onClick={handleProductsLoad} variant="secondary" size="md">
              Обновить
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        {isProductsLoading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex-1 bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full animate-pulse"
                  style={{ width: '60%' }}
                ></div>
              </div>
              <span className="font-medium text-gray-700">Загрузка...</span>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <tr>
                  <th
                    className="px-6 py-5 text-left text-xs font-bold text-gray-900 uppercase tracking-wider cursor-pointer hover:bg-indigo-100 rounded-tl-2xl"
                    onClick={() => handleSortUpdate('name')}
                  >
                    Наименование{' '}
                    {sortBy === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-5 text-left text-xs font-bold text-gray-900 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSortUpdate('vendor')}
                  >
                    Производитель{' '}
                    {sortBy === 'vendor' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-5 text-left text-xs font-bold text-gray-900 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSortUpdate('article')}
                  >
                    Артикул{' '}
                    {sortBy === 'article' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-5 text-right text-xs font-bold text-gray-900 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSortUpdate('price')}
                  >
                    Цена{' '}
                    {sortBy === 'price' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th
                    className="px-6 py-5 text-right text-xs font-bold text-gray-900 uppercase tracking-wider cursor-pointer hover:bg-indigo-100"
                    onClick={() => handleSortUpdate('rating')}
                  >
                    Рейтинг{' '}
                    {sortBy === 'rating' &&
                      (sortDirection === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-5 text-center text-xs font-bold text-gray-900 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-xl object-cover"
                            src={`https://dummyjson.com/image/i/products/${product.id}.webp`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-gray-900">
                            {product.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {product.vendor}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-500">
                      {product.article}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-bold text-gray-900">
                      ${product.price}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                          product.rating < 3
                            ? 'bg-red-100 text-red-800'
                            : product.rating < 4
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {product.rating}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                      <Button size="sm" className="px-4">
                        Добавить
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Modal isOpen={showAddForm} onClose={() => setShowAddForm(false)}>
          <NewProductForm onClose={() => setShowAddForm(false)} />
        </Modal>
      </div>
    </div>
  );
};
