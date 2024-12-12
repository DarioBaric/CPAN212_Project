const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    province: String,
    postal_code: String,
    country: String
});

const paymentDetailsSchema = new mongoose.Schema({
    method: String,
    transaction_id: String
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    shipping_address: addressSchema,
    billing_address: addressSchema,
    order_items: [mongoose.Schema.Types.Mixed],
    payment_details: paymentDetailsSchema,
    shipping_cost: Number,
    total_cost: Number
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
