const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const FaqsController = require('../controllers/faq');


router.get("/", FaqsController.Faqs_get_all);

router.post("/", FaqsController.Faqs_create_Faq);

router.get("/:FaqId", FaqsController.Faqs_get_Faq);

router.patch("/:FaqId", FaqsController.Faqs_update_Faq);

router.delete("/:FaqId", FaqsController.Faqs_delete);

module.exports = router;
