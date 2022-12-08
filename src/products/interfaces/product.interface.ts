import { Document } from 'mongoose';

export interface IProduct {
  readonly product_id: string;
  readonly refreshed_at: Date;
  readonly position: number;
  readonly category_id: string;
  readonly name: string;
  readonly url: string;
  readonly rating?: number;
  readonly reviewCount?: number;
  readonly thumbnail: string;
  readonly price: number;
  readonly currency?: string;
  readonly numberOfOffers: number;
  readonly credibility: number;
}

export interface IProductDoc extends Document, IProduct {}
