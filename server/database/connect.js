const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase",
});

const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error("erreur de la connexon a la base de donnee" + err.message);
    } else {
      console.log("connexion reuissi");
    }
  });
};

module.exports = {
  connectDB,
  db,
};
