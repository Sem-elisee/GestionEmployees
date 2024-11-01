const express = require("express");
const {
  GetAdmin,
  PostAdmin,
  VerifyEmail,
  putAdmin,
  ModifierPassword,
} = require("../controllers/admin");
const router = express.Router();

router.route("/").get(GetAdmin).post(PostAdmin);
router.route("/verification").post(VerifyEmail);
router.route("/modifierPassword").post(ModifierPassword);
router.route("/:id").put(putAdmin);
module.exports = router;
