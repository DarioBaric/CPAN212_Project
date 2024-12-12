const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: { type: String, default: " " }, // Use a default value like null or an empty string if no image is available
  ratings: Number,
  product_section: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
