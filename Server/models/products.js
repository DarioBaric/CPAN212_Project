const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: { type: String, default: null }, // Use a default value like null or an empty string if no image is available
  ratings: Number,
  product_section: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
