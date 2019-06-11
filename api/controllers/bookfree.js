const mongoose = require("mongoose");
const Bookfree = require("../models/bookfree");

exports.Bookfrees_get_all = (req, res, next) => {
  Bookfree.find().sort({ "name" : 1 })
    .select()
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        Bookfrees: docs
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

exports.Bookfrees_create_Bookfree = (req, res, next) => {
  const body = req.body;
  const bookfree = new Bookfree({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    author: req.body.author,
    descript: req.body.descript,
    rating: req.body.rating,
    bookImage: req.files[0].url,
    bookPDF: req.files[1].url,
    category: req.body.category
  });
  bookfree
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Bookfree successfully",
        createdBookfree: {
          _id: result._id,
          name: result.name,
          request: {
            type: "GET",
            url: "http://localhost:3000/Bookfrees/" + result._id
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

exports.Bookfrees_get_Bookfree = (req, res, next) => {
  const id = req.params.BookfreeId;
  Bookfree.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          Bookfree: doc,
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

exports.Bookfrees_update_Bookfree = (req, res, next) => {
  const id = req.params.BookfreeId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Bookfree.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Bookfree updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/Bookfrees/" + id
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

exports.Bookfrees_delete = (req, res, next) => {
  const id = req.params.BookfreeId;
  Bookfree.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Bookfree deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/Bookfrees",
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