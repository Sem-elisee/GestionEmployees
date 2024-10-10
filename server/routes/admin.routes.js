const express = require("express");
const { GetAdmin, PostAdmin } = require("../controllers/admin");
const router = express.Router();

router.route("/").get(GetAdmin).post(PostAdmin);
module.exports = router;
