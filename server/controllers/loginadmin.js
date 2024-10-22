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

const GetAdminInfos = async (req, res) => {
  const { AdminID } = req.params;
  const queryAdmin = "SELECT Email,Numero FROM admin WHERE AdminID = ?";
  db.query(queryAdmin, [AdminID], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ message: "erreur lors de la recuperation des informations" });
    }
    if (result.length === 0) {
      res.status(404).json({ message: "admin non retrouver" });
    }
    return res.status(200).json(result[0]);
  });
};

const LogAdmin = async (req, res) => {
  const { Email, Mot_de_Passe } = req.body;

  // Vérifier si l'email existe dans la base de données
  const checkEmailQuery = "SELECT * FROM admin WHERE Email = ?";
  db.query(checkEmailQuery, [Email], async (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Erreur lors de la vérification de l'email" });
    }

    // Vérifier si l'utilisateur existe
    if (result.length === 0) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const admin = result[0];

    // Comparer le mot de passe fourni avec le mot de passe haché
    bcrypt.compare(Mot_de_Passe, admin.Mot_de_Passe, (err, isMatch) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Erreur lors de la comparaison des mots de passe" });
      }

      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }
      const token = generateTokenAndSetCookie(res, admin.AdminID);

      return res.status(200).json({
        AdminID: admin.AdminID,
        Email: admin.Email,
        Numero: admin.Numero,
        message: "Connexion réussie",
        token,
      });
    });
  });
};

module.exports = {
  LogAdmin,
  GetlogAdmin,
  GetAdminInfos,
};
