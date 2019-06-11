const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const BookfreesController = require('../controllers/bookfree');
const multer = require('multer');

const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: 'khmer-make',
    api_key: '745767955329641',
    api_secret: '9VJyZS9cexI-IMVVRcmoForgMP8'
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "BookFree",
    allowedFormats: ["jpg", "png", "pdf"],
  
});

const upload = multer({ storage: storage });

//const uploadPDF = upload.single('bookPDF');

router.get("/", BookfreesController.Bookfrees_get_all);

router.post("/", upload.any(), BookfreesController.Bookfrees_create_Bookfree);

router.get("/:BookfreeId", BookfreesController.Bookfrees_get_Bookfree);

router.patch("/:BookfreeId", BookfreesController.Bookfrees_update_Bookfree);

router.delete("/:BookfreeId", BookfreesController.Bookfrees_delete);

module.exports = router;
