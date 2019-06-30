const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const ShopProfile = require("../models/shopProfile");

exports.ShopProfiles_get_all = (req, res, next) => {
  ShopProfile.find().sort({ "name" : 1 })
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        ShopProfiles: docs
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.ShopProfiles_create_ShopProfile = (req, res, next) => {
  const shopProfile = new ShopProfile({
    _id: new mongoose.Types.ObjectId(),
    shopName: req.body.shopName,
    descript: req.body.descript,
    tel: req.body.tel,
    location: req.body.location,
    profileLogo: req.files[0].url,
    profileCover: req.files[1].url,
    user: req.body.user
  });
  shopProfile
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created ShopProfile successfully",
        createdShopProfile: {
          _id: result._id,
          name: result.name,
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.ShopProfiles_update_ShopProfile = (req, res, next) => {
  const id = req.params.ShopProfileId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  ShopProfile.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "ShopProfile updated",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.ShopProfiles_delete = (req, res, next) => {
  const id = req.params.ShopProfileId;
  ShopProfile.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "ShopProfile deleted",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.ShopProfiles_get_ShopProfile = (req, res, next) => {
  const id = req.params.ShopProfileId;
  ShopProfile.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          ShopProfile: doc,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.ShopProfiles_get_product = (req, res, next) => {
  const id = req.params.ShopProfileId;
  Product.find( { shopProfile: mongoose.Types.ObjectId(id) } )
    .select("name price productImage")
    //.populate("shopProfile","username shop_name tel email")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            //shopProfile: doc.shopProfile,
          };
        })
      };
        // if (docs.length >= 0) {
      res.status(200).json(response);
        // } else {
        //     res.status(404).json({
        //         message: 'No entries found'
        //     });
        // }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};