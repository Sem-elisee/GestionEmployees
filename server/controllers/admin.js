const { getAllData } = require("../config/controllerconfig");
const { db } = require("../database/connect");
const bcrypt = require("bcrypt");
const { sendVerificationEmail, sendWelcomeEmail } = require("../mail/email");
const { generateTokenAndSetCookieMail } = require("../mail/generateToken");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");

const GetAdmin = (req, res) => {
  const query = "SELECT * FROM Admin";
  getAllData(query, res);
};

const PostAdmin = async (req, res) => {
  const { Email, Numero, Mot_de_Passe } = req.body;

  // Vérifier si l'email existe déjà dans la base de données
  const checkEmailQuery = "SELECT * FROM admin WHERE Email = ?";
  db.query(checkEmailQuery, [Email], async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification de l'email" });
    }
    if (result.length > 0) {
      return res.status(409).send("L'utilisateur existe déjà");
    } else {
      // Hacher le mot de passe
      bcrypt.hash(Mot_de_Passe, 10, async (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Erreur lors du hachage du mot de passe" });
        }

        // Générer un jeton de vérification et définir sa date d'expiration (4 heures)
        const verificationToken = Math.floor(
          100000 + Math.random() * 900000
        ).toString(); // Jeton à 6 chiffres
        const verificationTokenExpireAt = Date.now() + 4 * 60 * 60 * 1000; // Expire dans 4 heures

        // Insertion des informations de l'administrateur dans la base de données
        const insertAdminQuery =
          "INSERT INTO admin (Email, Numero, Mot_de_Passe, VerificationToken, VerificationTokenExpireAt) VALUES (?, ?, ?, ?, ?)";
        db.query(
          insertAdminQuery,
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

            // Envoi de l'email de vérification
            sendVerificationEmail(Email, verificationToken)
              .then(() => {
                // Générer un jeton JWT et l'envoyer dans un cookie
                generateTokenAndSetCookieMail(res, Email);

                return res.status(201).json({
                  message:
                    "Administrateur enregistré avec succès. Veuillez vérifier votre email pour activer votre compte.",
                  Email: Email,
                  Numero: Numero,
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

const VerifyEmail = async (req, res) => {
  try {
    const { code } = req.body;
    const query =
      "SELECT * FROM admin WHERE VerificationToken = ? AND VerificationTokenExpireAt > ?";
    db.query(query, [code, Date.now()], async (err, results) => {
      if (err) {
        console.log(err);
        return res
          .status(500)
          .json({ success: false, message: "Erreur interne du serveur" });
      }
      if (results.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Code invalide ou expiré" });
      }
      const user = results[0];

      // Mettre à jour l'administrateur en supprimant le jeton de vérification et sa date d'expiration
      const updateQuery =
        "UPDATE admin SET VerificationToken = NULL, VerificationTokenExpireAt = NULL WHERE AdminID = ?";
      db.query(updateQuery, [user.AdminID], async (updateErr, result) => {
        if (updateErr) {
          console.log(updateErr);
          return res
            .status(500)
            .json({ success: false, message: "Erreur interne du serveur" });
        }

        // Envoyer un email de bienvenue
        await sendWelcomeEmail(user.Email, user.Name);

        // Générer un nouveau jeton JWT et l'envoyer dans un cookie
        const token = generateTokenAndSetCookie(res, user.AdminID);

        return res.status(200).json({
          success: true,
          message: "Email vérifié avec succès",
          token,
        });
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Erreur interne du serveur" });
  }
};

module.exports = {
  GetAdmin,
  PostAdmin,
  VerifyEmail,
};
