const express = require("express");
const { check } = require("express-validator");
const Router = express.Router();
const authController = require("../controller/authController");

Router.get("/auth", authController.getLogin);

Router.post(
  "/login",
  [
    check("email", "Please enter vailid email!").isEmail(),
    check("password", "Password is required").exists()
  ],
  authController.postLogin
);

Router.post(
  "/register",
  [
    check("name", "Please enter name!")
      .not()
      .isEmpty(),
    check("email", "Please enter valid email!").isEmail(),
    check("password", "Password should be atleast 6 charector!").isLength({
      min: 6
    })
  ],
  authController.register
);

module.exports = Router;
