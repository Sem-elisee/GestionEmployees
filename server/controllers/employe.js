const { db } = require("../database/connect");
const {
  getAllData,
  insertData,
  modifyData,
  deleteData,
} = require("../config/controllerconfig");

const GetAllEmploye = (req, res) => {
  const query = "SELECT * FROM employe";
  getAllData(query, res);
};

const GetAllEmployeCount = (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM employe";
  getAllData(query, res);
};

const GetAllEmployeCountTechMoyen = (req, res) => {
  const query =
    "SELECT COUNT(Fonction) AS count FROM employe WHERE Fonction = 'Tech-moyen'";
  getAllData(query, res);
};

const GetAllEmployeCountTechMoyenSup = (req, res) => {
  const query =
    "SELECT COUNT(Fonction) AS count FROM employe WHERE Fonction = 'Tech-moyen-superieur'";
  getAllData(query, res);
};

const GetAllEmployeCountTechSup = (req, res) => {
  const query =
    "SELECT COUNT(Fonction) AS count FROM employe WHERE Fonction = 'Tech-superieur'";
  getAllData(query, res);
};

const PostEmploye = (req, res) => {
  const query =
    "INSERT INTO employe (Image,Nom,Date_Embauche,Salaire,Direction,Fonction) VALUES(?,?,?,?,?,?)";
  const { Nom, Date_Embauche, Salaire, Direction, Fonction } = req.body;
  const Image = req.file ? req.file.filename : null;
  insertData(
    query,
    [Image, Nom, Date_Embauche, Salaire, Direction, Fonction],
    res
  );
};

const PutEmploye = (req, res) => {
  const query =
    "UPDATE employe SET Image=?, Nom=?, Date_Embauche=?, Salaire=?, Direction=?, Fonction=? WHERE EmployeID=?";
  const { Nom, Date_Embauche, Salaire, Direction, Fonction } = req.body;
  const Image = req.file ? req.file.filename : null;
  const EmployeID = req.params.id;
  modifyData(
    query,
    [Image, Nom, Date_Embauche, Salaire, Direction, Fonction, EmployeID],
    res
  );
};

const DeleteEmploye = (req, res) => {
  const EmployeID = req.params.id;
  const query = "DELETE FROM employe WHERE EmployeID	=?";
  deleteData(query, [EmployeID], res);
};

module.exports = {
  GetAllEmploye,
  GetAllEmployeCount,
  PostEmploye,
  PutEmploye,
  DeleteEmploye,
  GetAllEmployeCountTechMoyen,
  GetAllEmployeCountTechMoyenSup,
  GetAllEmployeCountTechSup,
};
