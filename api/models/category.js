const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true , unique: true },
    categoryLogo: { type: String, required: true }
  	},
  	{timestamps: true });

module.exports = mongoose.model('Category', categorySchema);