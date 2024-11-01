const { db } = require("../database/connect");
const axios = require("axios");

let accessToken = null;

const GenerateToken = async () => {
  try {
    const response = await fetch(`https://api.orange.com/oauth/v3/token`, {
      method: "POST",
      headers: {
        Authorization: `Basic WVp6UVZRTnJMZTAwYWNEZUFaMHAxSWIwRXh2QzZZQjc6WEx0NEpEb092bnJlQzJnTmdvc1MzbUlZWWxpMGlUVE43NHg4RGRlVElHWXk=`,
        "Content-type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });
    const data = await response.json();
    if (data.access_token) {
      accessToken = data.access_token;
    }
  } catch (error) {
    console.error("Erreur lors de la génération du token");
  }
};

function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 90000).toString();
}

const EnvoyeSMS = async (req, res) => {
  const { Email } = req.body;
  if (!Email) {
    return res.status(400).json({ error: "Email requis" });
  }

  const query = "SELECT * FROM admin WHERE Email = ?";
  db.query(query, [Email], async (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erreur du serveur" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Email non trouvé" });
    }

    const User = results[0];
    const code = generateRandomCode();
    const message = `SMS-TEST-API : ${code}`;
    const Expires_at_SMS = new Date(Date.now() + 30 * 60000); // 30 minutes plus tard

    try {
      const smsResponse = await axios.post(
        `https://api.orange.com/smsmessaging/v1/outbound/tel:+2250748043393/requests`,
        // ${process.env.ORANGE_API_URL}
        {
          outboundSMSMessageRequest: {
            address: `tel:+225${User.Numero}`,
            senderAddress: `tel:+2250748043393`,
            outboundSMSTextMessage: {
              message: message,
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (smsResponse.status !== 201) {
        return res.status(500).json({ error: "Erreur lors de l'envoi du SMS" });
      }

      const updateSql =
        "UPDATE admin SET Verification_CodeSMS = ?, Created_at_SMS = ?, Expires_at_SMS = ? WHERE Email = ?";
      db.query(
        updateSql,
        [code, new Date(), Expires_at_SMS, Email],
        (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ error: "Erreur lors de l'enregistrement du code" });
          }
          res
            .status(200)
            .json({ message: "Code de validation envoyé avec succès" });
        }
      );
    } catch (err) {
      console.error("Erreur lors de l'envoi du SMS:", err);
      res.status(500).json({ error: "Erreur lors de l'envoi du SMS" });
    }
  });
};

// const EnvoyeSMS = async (req, res) => {
//   const { Email } = req.body;
//   if (!Email) {
//     res.status(400).json({ error: "Email requis" });
//   }
//   // Vérifier si l'email existe dans la base de données
//   const query = "SELECT * FROM admin WHERE Email = ?";

//   db.query(query, [Email], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Erreur du serveur" });
//     }
//     if (results.length === 0) {
//       res.status(404).json({ error: "Email non trouvé" });
//     }

//     const User = results[0];
//     const code = generateRandomCode();
//     const message = `SMS-TEST-API : ${code}`;
//     const Expires_at_SMS = new Date(Date.now() + 30 * 60000); // 30 minutes plus tard

//     try {
//       axios.post(
//         `${process.env.ORANGE_API_URL}/smsmessaging/v1/outbound/tel:+2250713441784/requests`,
//         {
//           outboundSMSMessageRequest: {
//             address: `tel:+225${User.Numero}`,
//             senderAddress: `tel:+2250748043393`, // Remplacer par le numéro approprié
//             outboundSMSTextMessage: {
//               message: message,
//             },
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (smsResponse.status !== 201) {
//         return res.status(500).json({ error: "Erreur lors de l'envoi du SMS" });
//       }

//       //   Sauvegarde du code de validation dans la base de données
//       const updateSql =
//         "UPDATE admin SET Verification_CodeSMS = ?, Created_at_SMS = ?, Expires_at_SMS = ? WHERE Email = ?";
//       db.query(
//         updateSql,
//         [code, new Date(), Expires_at_SMS, Email],
//         (err, results) => {
//           if (err) {
//             res
//               .status(500)
//               .json({ error: "Erreur lors de l'enregistrement du code" });
//           }
//           res
//             .status(200)
//             .json({ message: "Code de validation envoyé avec succès" });
//         }
//       );
//     } catch (err) {
//       console.error("Erreur lors de l'envoi du SMS:", err);
//       res.status(500).json({ error: "Erreur lors de l'envoi du SMS" });
//     }
//   });
// };

const VerifySMS = async () => {};

module.exports = {
  GenerateToken,
  EnvoyeSMS,
  VerifySMS,
};
