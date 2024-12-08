// models/Product.js

import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true, unique:true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  type: { type: String, enum: ['Non-Perishable', 'Perishable'], default: 'Non-Perishable' },
  expiryHours: { type: Number, default: 0 }, // Stores expiry time in milliseconds
  image: { type: String }, // Path or URL to the image
  createdAt: { type: Date, default: Date.now }, // Date of creation, used to calculate expiry
});

const Product = model('adminproducts', productSchema);

export default Product;
