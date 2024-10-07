const express = require("express");
const multer = require("multer");
const { getAllImages, postImages } = require("../controllers/img");
const router = express.Router();
const path = require("path");

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

router.route("/").get(getAllImages).post(upload.single("image"), postImages);

module.exports = router;
