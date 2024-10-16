const jwt = require("jsonwebtoken");

const generateTokenAndSetCookieMail = (res, userId) => {
  const tokenMail = jwt.sign({ userId }, process.env.JWT_SECRET_MAIL, {
    expiresIn: "7d",
  });

  res.cookie("token", tokenMail, {
    httOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

module.exports = { generateTokenAndSetCookieMail };
