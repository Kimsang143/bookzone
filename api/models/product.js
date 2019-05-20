const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String, required: true },
  	user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  	},
  	{timestamps: true });


module.exports = mongoose.model('Product', productSchema);