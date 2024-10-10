const Logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Déconnexion réussie" });
};

module.exports = {
  Logout,
};
