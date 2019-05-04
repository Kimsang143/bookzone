const mongoose = require("mongoose");
const Contact = require("../models/contact");


exports.contacts_get_all = (req, res, next) => {
  Contact.find()
    .select("name descript _id contactImage contactname email location telephone facebook")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        contacts: docs.map(doc => {
          return {
            name: doc.name,
            descript: doc.descript,
            contactImage: doc.contactImage,
            contactname: doc.contactname,
            email: doc.email,
            location: doc.location,
            telephone: doc.telephone,
            facebook: doc.facebook,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/contacts/" + doc._id
            }
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

exports.contacts_create_contact = (req, res, next) => {
  const contact = new Contact({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    contactImage: req.file.url,
    descript: req.body.descript,
    contactname: req.body.contactname,
    email: req.body.email,
    location: req.body.location,
    telephone: req.body.telephone,
    facebook: req.body.facebook
  });
  contact
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created contact successfully",
        createdcontact: {
          name: result.name,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/contacts/" + result._id
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

exports.contacts_get_contact = (req, res, next) => {
  const id = req.params.contactId;
  Contact.findById(id)
    .select()
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          contact: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/contacts"
          }
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

exports.contacts_update_contact = (req, res, next) => {
  const id = req.params.contactId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Contact.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "contact updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/contacts/" + id
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

exports.contacts_delete = (req, res, next) => {
  const id = req.params.contactId;
  Contact.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "contact deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/contacts",
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
