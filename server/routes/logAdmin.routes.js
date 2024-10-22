const express = require("express");
const {
  LogAdmin,
  GetlogAdmin,
  GetAdminInfos,
} = require("../controllers/loginadmin");
const Router = express.Router();

Router.route("/").get(GetlogAdmin).post(LogAdmin);
Router.route("/:AdminID").get(GetAdminInfos);

module.exports = Router;
