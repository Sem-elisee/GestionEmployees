const { getAllData, insertData } = require("../config/controllerconfig");
const { db } = require("../database/connect");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendWelcomeEmail } = require("../mail/email");
const { generateTokenAndSetCookieMail } = require("../mail/generateToken");

const GetAdmin = (req, res) => {
  const query = "SELECT * FROM Admin";
  getAllData(query, res);
};

// const PostAdmin = async (req, res) => {
//   const { Email, Numero, Mot_de_Passe } = req.body;
//   const checkEmailQuery = "SELECT * FROM admin WHERE Email =?";
//   db.query(checkEmailQuery, [Email], async (err, resultma) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ message: "Erreur lors de la vérification de l'email" });
//     }
//     if (resultma.length > 0) {
//       return res.status(409).send("Utilisateur existe deja");
//     } else {
//       bcrypt.hash(Mot_de_Passe, 10, async (err, hashedPassword) => {
//         if (err) {
//           return res
//             .status(500)
//             .json({ message: "Erreur lors du hachage du mot de passe" });
//         }
//         const query =
//           "INSERT INTO admin (Email, Numero, Mot_de_Passe) VALUES (?, ?, ?)";
//         insertData(query, [Email, Numero, hashedPassword], res);
//       });
//     }
//   });
// };

const PostAdmin = async (req, res) => {
  const { Email, Numero, Mot_de_Passe } = req.body;
  const checkEmailQuery = "SELECT * FROM admin WHERE Email =?";
  db.query(checkEmailQuery, [Email], async (err, resulma) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification de l'email" });
    }
    if (resulma.length > 0) {
      return res.status(409).send("Utilisateur existe déjà");
    } else {
      bcrypt.hash(Mot_de_Passe, 10, async (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Erreur lors du hachage du mot de passe" });
        }

        const verificationToken = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const verificationTokenExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        const query =
          "INSERT INTO admin (Email,Numero,Mot_de_Passe,VerificationToken,VerificationTokenExpireAt) VALUES (?,?,?,?,?)";

        db.query(
          query,
          [
            Email,
            Numero,
            hashedPassword,
            verificationToken,
            verificationTokenExpireAt,
          ],
          (err) => {
            if (err) {
              return res.status(500).json({
                message: "Erreur lors de l'insertion dans la base de données",
              });
            }
            sendVerificationEmail(Email, verificationToken)
              .then(() => {
                generateTokenAndSetCookieMail(res, Email);
                return res.status(201).json({
                  message:
                    "Administrateur enregistré avec succès. Veuillez vérifier votre email.",
                });
              })
              .catch((emailErr) => {
                return res.status(500).json({
                  message: "Erreur lors de l'envoi de l'email de vérification",
                  error: emailErr,
                });
              });
          }
        );
      });
    }
  });
};

module.exports = {
  GetAdmin,
  PostAdmin,
};
