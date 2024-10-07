const { db } = require("../database/connect");

const getAllData = (query, res) => {
  db.query(query, (err, result) => {
    if (err) {
      console.error(
        err,
        "une erreur s/est produit lors de l/affichage des donnees"
      );
      res.status(500).json({
        error: "une erreur s/est produit lors de l/affichage des donnees",
      });
    } else {
      res.json(result);
    }
  });
};

const insertData = (query, arrayData, res) => {
  db.query(query, arrayData, (err, result) => {
    if (err) {
      console.error(
        err,
        "une erreur s/est produit lors de l/insertion des donnees"
      );
      res.status(500).json({
        error: "une erreur s/est produit lors de l/insertion des donnees",
      });
    } else {
      res.json({ result: "insertion reuissir" });
    }
  });
};

const modifyData = (query, arrayData, res) => {
  db.query(query, arrayData, (err, result) => {
    if (err) {
      console.error(
        err,
        "une erreur s/est produit lors de la modification des donnees"
      ),
        res.status(500).json({
          error: "une erreur s/est produit lors de la modification des donnees",
        });
    } else {
      res.json({ result: "modification reuissir" });
    }
  });
};

const deleteData = (query, arrayData, res) => {
  db.query(query, arrayData, (err, result) => {
    if (err) {
      console.error(
        err,
        "une erreur s/est produit lors de la supression des donnees"
      );
      res.status(500).json({
        error: "une erreur s/est produit lors de la supression des donnees",
      });
    } else {
      res.json({ result: "supression reuissir" });
    }
  });
};

module.exports = {
  getAllData,
  insertData,
  modifyData,
  deleteData,
};
