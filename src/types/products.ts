export type TProduct = {
  id: number;
  name: string;
  vendor: string;
  article: string;
  price: number;
  rating: number;
  image?: string;
};

export type TParams = {
  sortBy?: string;
  order?: 'asc' | 'desc';
};

export type TNewProductForm = Omit<TProduct, 'id'>;
