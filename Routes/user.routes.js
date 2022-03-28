const express = require("express");
const Router = express.Router();
const userController = require("../Controllers/user.controller");

Router.post("/register", userController.register);
Router.post("/login", userController.login);
Router.post("/user/addTodo", userController.addTodo);
Router.delete("/user/removeTodo", userController.removeTodo);

module.exports = Router;
