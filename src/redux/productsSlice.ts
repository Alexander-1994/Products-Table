import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

import productsService from '~/api/products';
import { type TProduct } from '~/types/products';

type TProductsState = {
  items: TProduct[];
  loading: boolean;
  error: string | null;
  search: string;
  sortBy: keyof TProduct;
  sortDirection: 'asc' | 'desc';
};

const initialState: TProductsState = {
  items: [],
  loading: false,
  error: null,
  search: '',
  sortBy: 'name',
  sortDirection: 'asc',
};

export const fetchProducts = createAsyncThunk<
  TProduct[],
  void,
  { rejectValue: string }
>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    return await productsService.getProducts(50);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const addProduct = createAsyncThunk<
  TProduct,
  Omit<TProduct, 'id'>,
  { rejectValue: string }
>('products/addProduct', async (productData, { rejectWithValue }) => {
  try {
    const newProduct = await productsService.addProduct(productData);
    return newProduct;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setSort: (
      state,
      action: PayloadAction<{
        sortBy: keyof TProduct;
        sortDirection: 'asc' | 'desc';
      }>
    ) => {
      const { sortBy, sortDirection } = action.payload;
      if (state.sortBy === sortBy) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        state.sortBy = sortBy;
        state.sortDirection = 'asc';
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка загрузки';
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload); // Добавляем в начало
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка добавления';
      });
  },
});

export const { setSearch, setSort } = productsSlice.actions;
export default productsSlice.reducer;
