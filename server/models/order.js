const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    street: String,
    city: String,
    creditCard: String,
    shippingDate:Date,
    user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    products:[{type: mongoose.Schema.Types.ObjectId, ref: "Product"}],
});
module.exports = mongoose.model('Order', OrderSchema);
