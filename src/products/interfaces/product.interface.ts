import { Document } from 'mongoose';

export interface Product extends Document {
  readonly product_id: string;
  readonly refreshed_at: Date;
  readonly position: number;
  readonly category: string;
  readonly category_name: string;
  readonly name: string;
  readonly url: string;
  readonly rating?: number;
  readonly reviewCount?: number;
  readonly thumbnail: string;
  readonly price: number;
  readonly currency?: string;
  readonly numberOfOffers: number;
}
