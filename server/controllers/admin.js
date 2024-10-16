const { getAllData } = require("../config/controllerconfig");
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
          "INSERT INTO admin (Email, Numero, Mot_de_Passe, VerificationToken, VerificationTokenExpireAt, IsVerified) VALUES (?, ?, ?, ?, ?, FALSE)";

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
          .json({ success: false, message: "Internal server error" });
      }
      if (results.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid or Expired Code" });
      }
      const user = results[0];
      const updateQuery =
        "UPDATE admin SET isVerified = TRUE, VerificationToken = NULL, VerificationTokenExpireAt = NULL WHERE AdminID = ?";
      db.query(updateQuery, [user.AdminID], async (updateErr) => {
        if (updateErr) {
          console.log(updateErr);
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
        await sendWelcomeEmail(user.Email, user.Name);
        return res
          .status(200)
          .json({ success: true, message: "Email Verified Successfully" });
      });
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  GetAdmin,
  PostAdmin,
  VerifyEmail,
};
