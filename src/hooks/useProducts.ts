import { useEffect } from 'react';

import { locale } from '~/constants/locale';
import {
  fetchProducts,
  addProduct,
  setSearch,
  resetNewProductFlag,
} from '~/redux/productsSlice';
import type { TParams, TProduct } from '~/types/products';

import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import { useToast } from './useToast';

export const useProducts = () => {
  const dispatch = useAppDispatch();
  const { items, hasNewProduct, loading, error, search } = useAppSelector(
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

  const handleProductsLoad = (query?: TParams) =>
    dispatch(fetchProducts(query));

  const handleProductCreate = (productData: Omit<TProduct, 'id'>) =>
    dispatch(addProduct(productData));

  const handleSearchUpdate = (search: string) => dispatch(setSearch(search));

  return {
    items,
    loading,
    search,
    handleProductsLoad,
    handleProductCreate,
    handleSearchUpdate,
  };
};
