import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  product_id: {
    type: String,
    unique: true
  },
  
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },

  refreshed_at: Date,
  position: Number,
  name: String,
  url: String,
  rating: Number,
  reviewCount: Number,
  thumbnail: String,
  price: Number,
  currency: String,
  numberOfOffers: Number,
  credibility: Number
});
