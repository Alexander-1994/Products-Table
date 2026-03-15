export type TProduct = {
  id: number;
  name: string;
  vendor: string;
  article: string;
  price: number;
  rating: number;
  image?: string;
};

export type TSortParams = {
  sortBy?: string;
  order?: 'asc' | 'desc';
};

export type TSearchParams = {
  q: string;
};

export type TNewProductForm = Omit<TProduct, 'id'>;
