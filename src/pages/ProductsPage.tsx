import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ProductsTable, NewProductForm } from '~/components/features';
import { Header, Input, Modal } from '~/components/ui';
import { locale } from '~/constants/locale';
import { useAuth } from '~/hooks/useAuth';
import { useProducts } from '~/hooks/useProducts';
import type { TNewProductForm } from '~/types/products';

export const ProductsPage: FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState(''); /* TODO */
  const [showAddForm, setShowAddForm] = useState(false);

  const { user, initAuth, signOut, loading: isAuthLoading } = useAuth();
  const {
    items,
    loading: isProductsLoading,
    handleProductsLoad,
    handleProductCreate,
  } = useProducts();

  useEffect(() => {
    initAuth();
    handleProductsLoad();
  }, []);

  useEffect(() => {
    if (!isAuthLoading && !user) {
      navigate('/login');
    }
  }, [isAuthLoading, user, navigate]);

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  const handleModalOpen = () => {
    setShowAddForm(true);
  };

  const handleModalClose = () => {
    setShowAddForm(false);
  };

  const handleSubmit = async (data: TNewProductForm) => {
    await handleProductCreate(data);
    handleModalClose();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Header name={user.firstName} onLogout={handleLogout} />}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center lg:items-end">
            <div className="flex-1 min-w-0">
              <Input
                label={locale.searchByProduct}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={locale.find}
                className="text-lg"
              />{' '}
              {/* TODO */}
            </div>
          </div>
        </div>
        <ProductsTable
          items={items}
          isLoading={isProductsLoading}
          onUpdate={handleProductsLoad}
          onAdd={handleModalOpen}
          onSort={handleProductsLoad}
        />
        <Modal isOpen={showAddForm} onClose={handleModalClose}>
          <NewProductForm
            isLoading={isProductsLoading}
            onSubmit={handleSubmit}
            onClose={handleModalClose}
          />
        </Modal>
      </div>
    </div>
  );
};
