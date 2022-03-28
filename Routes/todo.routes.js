const express = require("express");
const Router = express.Router();
const todoController = require("../Controllers/todo.controller");

Router.post("/todos/addTodo", todoController.addTodo);
Router.delete("/todos/removeTodo", todoController.removeTodo);

module.exports = Router;
