const express = require("express");
const { EnvoyeSMS } = require("../controllers/sms_send");
const router = express.Router();

router.route("/").post(EnvoyeSMS);

module.exports = router;
