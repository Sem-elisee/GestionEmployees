require("dotenv").config();
const express = require("express");
const { connectDB } = require("./database/connect");
const app = express();
const port = 2003;
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const employe = require("./routes/employe.routes");
const img = require("./routes/img.routes");
const Admin = require("./routes/admin.routes");
const LogAdmin = require("./routes/logAdmin.routes");
const Logout = require("./routes/logout.routes");
const SMS = require("./routes/sms_send.routes");

console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("JWT_SECRET_MAIL:", process.env.JWT_SECRET_MAIL);

app.get("/", (req, res) => res.send("send sem"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(
  "/api/v.01/employe",
  express.static(path.join(__dirname, "public/uploads")),
  employe
);
app.use("/api/v.01/employe/count", employe);
app.use("/api/v.01/admin", Admin);
app.use("/api/v.01/logAdmin", LogAdmin);
app.use("/api/v.01/logout", Logout);
app.use("/api/v.01/SMS", SMS);

const start = async () => {
  try {
    await connectDB();
    app.listen(
      port,
      console.log(`le server actif au port : http://localhost:${port}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
