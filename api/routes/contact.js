const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ContactsController = require('../controllers/contact');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'khmer-make',
    api_key: '745767955329641',
    api_secret: '9VJyZS9cexI-IMVVRcmoForgMP8'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "demo",
    allowedFormats: ["jpg", "png"]
});

const upload = multer({ storage: storage });

router.get("/", ContactsController.contacts_get_all);

router.post("/", upload.single('contactImage'), ContactsController.contacts_create_contact);

router.get("/:contactId", ContactsController.contacts_get_contact);

router.patch("/:contactId", checkAuth, ContactsController.contacts_update_contact);

router.delete("/:contactId", checkAuth, ContactsController.contacts_delete);

module.exports = router;
