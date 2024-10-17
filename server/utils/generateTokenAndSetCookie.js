const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (res, AdminID) => {
  const token = jwt.sign({ AdminID }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  console.log("Token généré:", token);

  res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 1000,
    sameSite: "strict",
  });

  console.log("Cookie authToken défini");
  return token;
};

module.exports = {
  generateTokenAndSetCookie,
};
