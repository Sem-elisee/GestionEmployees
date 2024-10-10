const express = require("express");
const { db } = require("../database/connect");
const bcrypt = require("bcrypt");
const { getAllData } = require("../config/controllerconfig");
const {
  generateTokenAndSetCookie,
} = require("../utils/generateTokenAndSetCookie");

const GetlogAdmin = (req, res) => {
  const query = "SELECT * FROM admin";
  getAllData(query, res);
};

const LogAdmin = async (req, res) => {
  const { Email, Mot_de_Passe } = req.body;
  const checkAdminQuery = "SELECT * FROM admin WHERE Email = ?";
  db.query(checkAdminQuery, [Email], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la recherche de l'utilisateur" });
    }
    if (result.length === 0) {
      return res.status(500).json({
        message: " 'L'utilisateur n'existe pas. Veuillez vous inscrire.' ",
      });
    }
    const user = result[0];
    bcrypt.compare(Mot_de_Passe, user.Mot_de_Passe, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la vérification du mot de passe" });
      }
      if (!isMatch) {
        return res.status(401).json({ message: "Mot de passe incorrect" });
      }
      const token = generateTokenAndSetCookie(res, result.insertId);
      return res.status(200).json({ message: "Connexion réussie", token });
    });
  });
};

module.exports = {
  LogAdmin,
  GetlogAdmin,
};
