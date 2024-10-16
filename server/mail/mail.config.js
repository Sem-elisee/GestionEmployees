const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "guibesem@gmail.com",
    pass: "cbyi bkem fzwf narb",
  },
});

module.exports = { transporter };
