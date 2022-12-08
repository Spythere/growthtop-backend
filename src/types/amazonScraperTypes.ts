import { amazonURLs } from "../consts/amazonURLs";

export type AmazonCategoryType = keyof typeof amazonURLs;

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
  credibility: number;
}
