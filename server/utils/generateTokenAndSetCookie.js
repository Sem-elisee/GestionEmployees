const jwt = require("jsonwebtoken");

// const JWT_SECRET = process.env.JWT_SECRET;

// const generateTokenAndSetCookie = (res, userId) => {
//   const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7h" });
//   res.cookie("token", token, { httpOnly: true });
//   return token;
// };

const generateTokenAndSetCookie = (res, adminId) => {
  const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, {
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
