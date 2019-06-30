const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String },
    publish_year: { type: String },
    descript: { type: String, required: true },
    rating: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
    shopProfile: [{ type: Schema.Types.ObjectId, ref: 'ShopProfile', required: true }]
  	},
  	{timestamps: true });


module.exports = mongoose.model('Product', productSchema);