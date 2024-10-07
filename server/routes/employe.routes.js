const express = require("express");
const {
  GetAllEmploye,
  PostEmploye,
  PutEmploye,
  DeleteEmploye,
  GetAllEmployeCount,
} = require("../controllers/employe");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Spécifiez le répertoire où les images seront stockées
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    ); // Définir un nom unique pour le fichier
  },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.route("/").get(GetAllEmploye).post(upload.single("Image"), PostEmploye);
router.route("/:id").put(upload.single("Image"), PutEmploye);
router.route("/:id").delete(DeleteEmploye);
router.route("/count").get(GetAllEmployeCount);

module.exports = router;
