import { useEffect } from 'react';

import { locale } from '~/constants/locale';
import {
  resetNewProductFlag,
  fetchProducts,
  searchProducts,
  addProduct,
} from '~/redux/productsSlice';
import type { TSortParams, TSearchParams, TProduct } from '~/types/products';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useToast } from './useToast';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { items, hasNewProduct, loading, error } = useAppSelector(
    (state) => state.products
  );
  const { toastError, toastSuccess } = useToast();

  useEffect(() => {
    if (error) {
      toastError(error);
    } else if (hasNewProduct) {
      toastSuccess(locale.productAdded);
      dispatch(resetNewProductFlag());
    }
  }, [error, hasNewProduct]);

  const handleProductsLoad = (query?: TSortParams) =>
    dispatch(fetchProducts(query));

  const handleProductsSearch = (query: TSearchParams) =>
    dispatch(searchProducts(query));

  const handleProductCreate = (productData: Omit<TProduct, 'id'>) =>
    dispatch(addProduct(productData));

  return {
    items,
    loading,
    handleProductsLoad,
    handleProductsSearch,
    handleProductCreate,
  };
};
