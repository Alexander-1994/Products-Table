import { locale } from '~/constants/locale';
import type { TSortParams, TSearchParams, TProduct } from '~/types/products';

const prepareProduct = (product: Record<string, any>): TProduct => ({
  id: product.id,
  name: product.title,
  vendor: product.brand || 'Unknown',
  article: `ART-${product.id}`,
  price: product.price,
  rating: product.rating,
  image: product.images?.[0],
});

class ProductsService {
  async getProducts(params?: TSortParams): Promise<TProduct[]> {
    const query = new URLSearchParams();
    const { sortBy, order } = params ?? {};

    if (sortBy) {
      query.append('sortBy', sortBy);
    }

    if (order) {
      query.append('order', order);
    }

    const url = query.size
      ? `/api/products?${query.toString()}`
      : '/api/products';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(locale.failedToLoadProductList);
    }

    const data = await response.json();

    return data.products.map(prepareProduct);
  }
  async searchProducts(params: TSearchParams): Promise<TProduct[]> {
    const query = new URLSearchParams();
    const { q } = params;

    query.append('q', q);

    const response = await fetch(`/api/products/search?${query.toString()}`);

    if (!response.ok) {
      throw new Error(locale.failedToLoadProductList);
    }

    const data = await response.json();

    return data.products.map(prepareProduct);
  }
  /**
   * Заглушка для добавления нового продукта (по ТЗ не нужен реальный API)
   */
  async addProduct(product: Omit<TProduct, 'id'>): Promise<TProduct> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const isSuccess = Math.random() < 0.5;

    if (isSuccess) {
      return {
        id: Date.now(),
        ...product,
      };
    }

    throw new Error(locale.errorAddingProduct);
  }
}

export default new ProductsService();
