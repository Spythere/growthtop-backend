import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  name: String,
  url: String,
  display_name: String,
  credibility: Number
});
