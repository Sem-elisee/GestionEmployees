const {
  Verification_Email_Template,
  Welcome_Email_Template,
} = require("../mail/emailTemplates");
const { transporter } = require("./mail.config");

const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"APITEST SEM" <guibesem@gmail.com>',
      to: email,
      subject: "Vérifiez votre e-mail",
      text: "Vérifiez votre e-mail",
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ),
    });
    console.log("E-mail envoyé avec succès", response);
  } catch (err) {
    console.log(err);
  }
};

const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: '"Guibe" <guibesem@gmail.com>',
      to: email,
      subject: "E-mail de bienvenue",
      text: "E-mail de bienvenue",
      html: Welcome_Email_Template.replace("{name}", name),
    });
    console.log("E-mail envoyé avec succès", response);
  } catch (err) {
    console.log("Erreur Email", err);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
};
