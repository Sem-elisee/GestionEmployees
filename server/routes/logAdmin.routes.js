const express = require("express");
const { LogAdmin, GetlogAdmin } = require("../controllers/loginadmin");
const Router = express.Router();

Router.route("/").get(GetlogAdmin).post(LogAdmin);

module.exports = Router;
