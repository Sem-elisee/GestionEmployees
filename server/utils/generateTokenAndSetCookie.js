const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7h" });
  res.cookie("token", token, { httpOnly: true });
  return token;
};

module.exports = {
  generateTokenAndSetCookie,
};
