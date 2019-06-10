const mongoose = require("mongoose");
const Faq = require("../models/faq");


exports.Faqs_get_all = (req, res, next) => {
  Faq.find()
    .select("_id question answer")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        Faqs: docs
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

exports.Faqs_create_Faq = (req, res, next) => {
  const faq = new Faq({
    _id: new mongoose.Types.ObjectId(),
    question: req.body.question,
    answer: req.body.answer,
  });
  faq
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created Faq successfully",
        createdFaq: {
          _id: result._id,
          question: result.question,
          answer: result.answer,
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

exports.Faqs_get_Faq = (req, res, next) => {
  const id = req.params.FaqId;
  Faq.findById(id)
    .select("_id question answer")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          Faq: doc,
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

exports.Faqs_update_Faq = (req, res, next) => {
  const id = req.params.FaqId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Faq.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Faq updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/Faqs/" + id
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

exports.Faqs_delete = (req, res, next) => {
  const id = req.params.FaqId;
  Faq.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Faq deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/Faqs",
          body: { name: "String", descript: "String" }
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
