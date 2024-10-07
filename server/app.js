const express = require("express");
const { connectDB } = require("./database/connect");
const app = express();
const port = 2003;
const cors = require("cors");
const employe = require("./routes/employe.routes");
const path = require("path");
const img = require("./routes/img.routes");

app.get("/", (req, res) => res.send("send sem"));

app.use(express.json());
app.use(cors());

app.use(
  "/api/v.01/employe",
  express.static(path.join(__dirname, "public/uploads")),
  employe
);
app.use("/api/v.01/employe/count", employe);

// app.use(
//   "/api/v.01/img",
//   express.static(path.join(__dirname, "public/uploads")),
//   img
// );

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
