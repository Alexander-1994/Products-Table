import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';

import productsService from '~/api/products';
import { locale } from '~/constants/locale';
import type { TParams, TProduct } from '~/types/products';

type TProductsState = {
  items: TProduct[];
  hasNewProduct: boolean;
  loading: boolean;
  error: string | null;
  search: string;
};

const initialState: TProductsState = {
  items: [],
  hasNewProduct: false,
  loading: false,
  error: null,
  search: '',
};

export const fetchProducts = createAsyncThunk<
  TProduct[],
  TParams | undefined,
  { rejectValue: string }
>('products/fetchProducts', async (query = {}, { rejectWithValue }) => {
  try {
    return await productsService.getProducts(query);
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
    resetNewProductFlag: (state) => {
      state.hasNewProduct = false;
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
        state.error = action.payload || locale.failedToLoadProductList;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
        state.hasNewProduct = true;
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || locale.errorAddingProduct;
      });
  },
});

export const { setSearch, resetNewProductFlag } = productsSlice.actions;
export default productsSlice.reducer;
