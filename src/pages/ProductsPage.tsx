import { type FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ProductSearch,
  ProductsTable,
  NewProductForm,
} from '~/components/features';
import { Header, Input, Modal } from '~/components/ui';
import { locale } from '~/constants/locale';
import { useAuth } from '~/hooks/useAuth';
import { useProducts } from '~/hooks/useProducts';
import type { TNewProductForm } from '~/types/products';

export const ProductsPage: FC = () => {
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);

  const { user, initAuth, signOut, loading: isAuthLoading } = useAuth();
  const {
    items,
    loading: isProductsLoading,
    handleProductsLoad,
    handleProductsSearch,
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
      <Header name={user?.firstName} onLogout={handleLogout} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <ProductSearch
          onSearch={handleProductsSearch}
          onClear={handleProductsLoad}
        />
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
