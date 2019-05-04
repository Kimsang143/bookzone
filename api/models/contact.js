const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    contactImage: { type: String, required: true },
    descript: { type: String, required: true },
    contactname: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    telephone: { type: String, required: true },
    facebook: { type: String }
	},
    {
  	timestamps: true
});

module.exports = mongoose.model('Contact', productSchema);