const { getAllData, insertData } = require("../config/controllerconfig");
const { db } = require("../database/connect");
const bcrypt = require("bcrypt");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");

const GetAdmin = (req, res) => {
  const query = "SELECT * FROM Admin";
  getAllData(query, res);
};

const PostAdmin = async (req, res) => {
  const { Email, Numero, Mot_de_Passe } = req.body;
  const checkEmailQuery = "SELECT * FROM admin WHERE Email =?";
  db.query(checkEmailQuery, [Email], async (err, resultma) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification de l'email" });
    }
    if (resultma.length > 0) {
      return res.status(409).send("Utilisateur existe deja");
    } else {
      bcrypt.hash(Mot_de_Passe, 10, async (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Erreur lors du hachage du mot de passe" });
        }
        const query =
          "INSERT INTO admin (Email, Numero, Mot_de_Passe) VALUES (?, ?, ?)";
        db.query(query, [Email, Numero, hashedPassword], (err, result) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Erreur lors de l'insertion" });
          }
          const token = generateTokenAndSetCookie(res, result.insertId);
          return res
            .status(201)
            .json({ message: "Administrateur créé avec succès", token });
        });
      });
    }
  });
};

module.exports = {
  GetAdmin,
  PostAdmin,
};
