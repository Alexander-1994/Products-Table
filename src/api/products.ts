import { locale } from '~/constants/locale';
import type { TParams, TProduct } from '~/types/products';

class ProductsService {
  async getProducts(params?: TParams): Promise<TProduct[]> {
    const search = new URLSearchParams();
    const { sortBy, order } = params ?? {};

    if (sortBy) {
      search.append('sortBy', sortBy);
    }

    if (order) {
      search.append('order', order);
    }

    const url = search.size
      ? `/api/products?${search.toString()}`
      : '/api/products';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(locale.failedToLoadProductList);
    }

    const data = await response.json();

    return data.products.map(
      (product: any): TProduct => ({
        id: product.id,
        name: product.title,
        vendor: product.brand || 'Unknown',
        article: `ART-${product.id}`,
        price: product.price,
        rating: product.rating,
        image: product.images?.[0],
      })
    );
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
