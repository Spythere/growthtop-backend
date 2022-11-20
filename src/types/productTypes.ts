export interface IProduct {
  position: number;
  category: string;
  categoryUrl: string;
  name: string;
  price: number;
  currency: string;
  numberOfOffers: number;
  url: string;
  thumbnail: string;
}

export interface ICategory {
  category: string;
  count: number;
}