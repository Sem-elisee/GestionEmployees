const express = require("express");
const { GetAdmin, PostAdmin, VerifyEmail } = require("../controllers/admin");
const router = express.Router();

router.route("/").get(GetAdmin).post(PostAdmin);
router.route("/verification").post(VerifyEmail);
module.exports = router;
