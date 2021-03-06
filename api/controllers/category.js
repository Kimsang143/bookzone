const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Category = require("../models/category");
const bodyParser = require('body-parser');
const Bookfree = require("../models/bookfree");
exports.categorys_get_all = (req, res, next) => {
  Category.find().sort({ "name" : 1 })
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        categorys: docs.map(doc => {
          return {
            _id: doc._id,
            name: doc.name,
            categoryLogo: doc.categoryLogo,
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

exports.categorys_create_category = (req, res, next) => {
  const category = new Category({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    categoryLogo: req.file.url
  });
  category
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created category successfully",
        createdcategory: {
          _id: result._id,
          name: result.name,
          request: {
            type: "GET",
            url: "http://localhost:3000/categorys/" + result._id
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

exports.categorys_update_category = (req, res, next) => {
  const id = req.params.categoryId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Category.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "category updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/categorys/" + id
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

exports.categorys_delete = (req, res, next) => {
  const id = req.params.categoryId;
  Category.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "category deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/categorys",
          body: { name: "String" }
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

exports.categorys_get_category = (req, res, next) => {
  const id = req.params.categoryId;
  Product.find( { category: mongoose.Types.ObjectId(id) } )
    .select()
    .populate("Product")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        categorys: docs
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
exports.Books_get_user = (req, res, next) => {
  Product.aggregate([{$group : {_id : "$category", user_product : {$sum : 1}}}])
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