const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const ShopProfilesController = require('../controllers/shopProfile');
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
    folder: "ShopProfile",
    allowedFormats: ["jpg", "png"],
});

const upload = multer({ storage: storage });

router.get("/", ShopProfilesController.ShopProfiles_get_all);

router.post("/", upload.any(), ShopProfilesController.ShopProfiles_create_ShopProfile);

router.get("/:ShopProfileId", ShopProfilesController.ShopProfiles_get_ShopProfile);

router.patch("/:ShopProfileId", ShopProfilesController.ShopProfiles_update_ShopProfile);

router.delete("/:ShopProfileId", ShopProfilesController.ShopProfiles_delete);

module.exports = router;