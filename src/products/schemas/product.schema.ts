import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true
  },
  
  refreshed_at: Date,
  position: Number,
  category: String,
  name: String,
  url: String,
  rating: Number,
  reviewCount: Number,
  thumbnail: String,
  price: Number,
  currency: String,
  numberOfOffers: Number
});
