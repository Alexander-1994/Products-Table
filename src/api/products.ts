import type { TProduct } from '~/types/products';

class ProductsService {
  async getProducts(limit = 50): Promise<TProduct[]> {
    const response = await fetch(`/api/products?limit=${limit}`);

    if (!response.ok) {
      throw new Error('Не удалось загрузить список продуктов');
    }

    const data = await response.json();

    return data.products.map(
      (p: any): TProduct => ({
        id: p.id,
        name: p.title,
        vendor: p.brand || 'Unknown',
        article: `ART-${p.id}`,
        price: p.price,
        rating: p.rating || Math.random() * 5 /* TODO */,
      })
    );
  }

  /**
   * Заглушка для добавления нового продукта (по ТЗ не нужен реальный API)
   */
  async addProduct(product: Omit<TProduct, 'id'>): Promise<TProduct> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      id: Date.now(),
      ...product,
      price: product.price,
      rating: product.rating,
    }; /* TODO */
  }
}

export default new ProductsService();
