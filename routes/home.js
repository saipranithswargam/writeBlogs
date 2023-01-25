const express = require('express');

const UserController = require("../Controllers/user");

const Router = express.Router();
Router.get("/",UserController.getHomePage);

Router.post("/home",UserController.CreateOrFind);

Router.post("/signup",UserController.createNewUser);

Router.post("/login",UserController.FindUser);

module.exports = Router;