const express = require("express");
const Router = express.Router();
const userController = require("../controller/user");

Router.delete("/user/:id", userController.deleteUser);

module.exports = Router;
