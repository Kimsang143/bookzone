const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    shopName: { type: String, required: true },
    descript: { type: String, required: true },
    tel: { type: String, required: true },
    location: { type: String, required: true },
    profileLogo: { type: String, required: true },
    profileCover: { type: String, required: true },
  	user: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }]
  	},
  	{timestamps: true });


module.exports = mongoose.model('ShopProfile', ProfileSchema);