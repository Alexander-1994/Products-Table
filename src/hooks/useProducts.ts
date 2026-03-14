import { useDispatch, useSelector } from 'react-redux';

import {
  fetchProducts,
  addProduct,
  setSearch,
  setSort,
} from '~/redux/productsSlice';
import { type TRootState, type TAppDispatch } from '~/redux/store';
import { type TProduct } from '~/types/products';

export const useProducts = () => {
  const dispatch = useDispatch<TAppDispatch>();
  const { items, loading, error, search, sortBy, sortDirection } = useSelector(
    (state: TRootState) => state.products
  );

  const handleProductsLoad = () => dispatch(fetchProducts());

  const handleProductCreate = (productData: Omit<TProduct, 'id'>) =>
    dispatch(addProduct(productData));

  const handleSearchUpdate = (search: string) => dispatch(setSearch(search));

  const handleSortUpdate = (column: keyof TProduct) => {
    dispatch(
      setSort({
        sortBy: column,
        sortDirection:
          column === sortBy
            ? sortDirection === 'asc'
              ? 'desc'
              : 'asc'
            : 'asc',
      })
    );
  };

  return {
    items,
    loading,
    error,
    search,
    sortBy,
    sortDirection,
    handleProductsLoad,
    handleProductCreate,
    handleSearchUpdate,
    handleSortUpdate,
  };
};
