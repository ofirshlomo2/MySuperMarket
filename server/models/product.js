const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},
    price: Number,
    image: String
})
module.exports = mongoose.model('Product', ProductSchema);
