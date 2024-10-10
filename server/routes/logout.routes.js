const express = require("express");
const { Logout } = require("../controllers/logout");

const router = express.Router();
router.route("/").post(Logout);

module.exports = router;
