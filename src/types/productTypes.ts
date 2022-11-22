export interface IProduct {
  product_id: string;
  refreshed_at: Date;
  position: number;
  category: string;
  category_name: string;
  name: string;
  url: string;
  rating?: number;
  reviewCount?: number;
  thumbnail: string;
  price: number;
  currency?: string;
  numberOfOffers: number;
}

export interface ICategory {
  category: string;
  count: number;
}
