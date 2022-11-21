export type AmazonCategoryType = 'Books' | 'Electronics' | 'Apps & Games';

export interface IAmazonBestseller {
  position: number;
  category: AmazonCategoryType;

  name: string;
  url: string;

  rating?: number;
  reviewCount?: number;

  thumbnail: string;

  price: number;
  currency: string;

  numberOfOffers: number;
}
