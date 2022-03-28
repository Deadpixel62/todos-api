const Todo = require("../Models/todo.model");
const todoController = {};
const jwt = require("jsonwebtoken");
const key = process.env.KEY;

todoController.addTodo = async function (req, res) {
  const { title, description, date, completed } = req.body;
  try {
    const newTodo = new Todo({
      title,
      description,
      date,
      completed,
    });
    await newTodo.save();
    return res.status(201).json({
      message: "Todo added successfully!",
      newTodo,
    });
  } catch {
    res.status(500).json({
      message: "Error occured while adding fav",
      error,
    });
  }
};

todoController.removeTodo = async function (req, res) {
  let todo;
  try {
    todo = await Todo.deleteOne({ _id: req.body._id });
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
};

todoController.toggleCompleted = async function (req, res) {
  let todo;
  try {
    todo = await Todo.updateOne(
      { _id: req.body._id },
      { $set: { completed: req.body.completed } }
    );
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = todoController;
