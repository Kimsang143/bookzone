const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

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

router.get("/", ProductsController.products_get_all);

router.get("/new", ProductsController.products_get_new);

//router.get("/user/:productUser" ,ProductsController.products_get_users);

router.get("/search/:productName", ProductsController.products_get_search);

router.get("/popular", ProductsController.products_get_popular);

router.get("/best", ProductsController.products_get_best);

//router.get("/user_product" ,ProductsController.products_get_user);

router.post("/", checkAuth, upload.single('productImage'), ProductsController.products_create_product);

router.get("/:productId", ProductsController.products_get_product);

router.patch("/:productId", checkAuth, ProductsController.products_update_product);

router.delete("/:productId", checkAuth, ProductsController.products_delete);

module.exports = router;
