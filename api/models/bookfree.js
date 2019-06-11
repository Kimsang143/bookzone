const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    author: { type: String, required: true },
    descript: { type: String, required: true },
    rating: { type: String, required: true },
    bookImage: { type: String, required: true },
    bookPDF: { type: String, required: true },
    category: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }]
  	},
  	{timestamps: true });


module.exports = mongoose.model('BookFree', bookSchema);