const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: { type: String, required: true },
    answer: { type: String, required: true }
  	},
  	{timestamps: true });

module.exports = mongoose.model('Faq', faqSchema);