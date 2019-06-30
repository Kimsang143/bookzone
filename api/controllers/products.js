const mongoose = require("mongoose");
const Product = require("../models/product");
const ShopProfile = require("../models/shopProfile");

exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("name price _id productImage rating shopProfile author descript")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            author: doc.author,
            rating: doc.rating,
            price: doc.price,
            productImage: doc.productImage,
            descript: doc.descript,
            shopProfile: doc.shopProfile
          };
        })
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

// Find a Products by Name
exports.products_get_search = (req, res, next) => {
  
  Product.findOne({ name: req.params.productName })
  .select()
  .exec(function (err, product) {
    if (err){
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Book not found with given name " + req.params.productName
        });                
      }
      return res.status(500).send({
        message: "Error retrieving Products with given shopProfile Id " + req.params.productName
      });
    }
          
    res.send(product);
  });
};

exports.products_get_new = (req, res, next) => {
  Product.find().limit(10).sort({ "createdAt" : -1 })
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
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


exports.products_get_popular = (req, res, next) => {
  Product.find().limit(3).sort({ "createdAt" : -1 })
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
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


exports.products_get_best = (req, res, next) => {
  Product.find().limit(10).sort({ "price": -1 ,"createdAt" : -1 })
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
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


// exports.products_get_shopProfile = (req, res, next) => {
//   Product.aggregate([{$group : {_id : "$shopProfile", shopProfile_product : {$sum : 1}}}])
//     .exec()
//     .then(docs => {
//       const response = {
//         count: docs.length,
//         products: docs
//       };
//       //   if (docs.length >= 0) {
//       res.status(200).json(response);
//       //   } else {
//       //       res.status(404).json({
//       //           message: 'No entries found'
//       //       });
//       //   }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// };

exports.products_create_product = (req, res, next) => {
  const body = req.body;
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    author: req.body.author,
    publisher: req.body.publisher,
    publish_year: req.body.publish_year,
    descript: req.body.descript,
    rating: req.body.rating,
    price: req.body.price,
    productImage: req.file.url,
    category: req.body.category,
    shopProfile: req.body.shopProfileId
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
           _id: result._id,
          name: result.name,
          author: result.author,
          price: result.price,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id
          }
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

// important shopProfile item
// exports.products_get_shopProfiles = (req, res, next) => {
//   const id = req.params.productshopProfile;
//   Product.find( { shopProfile: mongoose.Types.ObjectId(id) } )
//     .select("name price productImage")
//     .exec()
//     .then(doc => {
//       console.log("From database", doc);
//       if (doc) {
//         res.status(200).json({
//           product: doc,
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select()
    .populate("shopProfile","shopName descript tel location profileLogo")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          
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

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id
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

exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" }
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
