const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587, // ou 465 pour SSL
  secure: false, // true si vous utilisez le port 465
  auth: {
    user: "guibesem@gmail.com",
    pass: "cbyi bkem fzwf narb",
  },
});

module.exports = { transporter };
