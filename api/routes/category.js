const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const CategorysController = require('../controllers/category');

//upload icon category
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

router.get("/", CategorysController.categorys_get_all);

router.get("/number", CategorysController.Books_get_user);

router.post("/", CategorysController.categorys_create_category);

router.get("/:categoryId", CategorysController.categorys_get_category);

router.patch("/:categoryId", CategorysController.categorys_update_category);

router.delete("/:categoryId", CategorysController.categorys_delete);

module.exports = router;
