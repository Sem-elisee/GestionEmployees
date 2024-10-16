const jwt = require("jsonwebtoken");

const generateTokenAndSetCookieMail = (res, userId) => {
  const tokenMail = jwt.sign({ userId }, process.env.JWT_SECRET_MAIL, {
    expiresIn: "4h",
  });

  res.cookie("token", tokenMail, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 4 * 60 * 60 * 1000,
  });
};

module.exports = { generateTokenAndSetCookieMail };
