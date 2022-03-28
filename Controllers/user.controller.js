const User = require("../Models/user.model");
const userController = {};
const jwt = require("jsonwebtoken");
const key = process.env.KEY;

userController.register = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ msg: "User already exists with this email." });

    const newUser = new User({
      email,
    });
    await newUser.save();
    return res.status(201).json({
      message: "User added successfully!",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

userController.getUser = (req, res) => {
  let user;
  try {
    user = User.findOne({ _id: req.body.userId })
      .populate("todo")
      .then((user) => {
        res.status(200).send(user);
      });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

userController.getAllUsers = async function (req, res) {
  try {
    const users = await User.find({}).populate("todo");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

userController.getUserTodos = async function (req, res) {
  try {
    console.log("=====", req.body);
    const user = await User.findOne({ _id: req.params.userId }).populate(
      "todo"
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// userController.getAllUsers = async function (req, res) {
//   console.log("GET /users");
//   let users;
//   try {
//     users = await User.find().populate("Todo");
//     res.status(200).send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

// userController.register = async (req, res) => {
//   try {
//     const user = await User.create(req.body);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

userController.login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    const token = jwt.sign({ id: user._id }, key, { expiresIn: "3h" });
    res.status(200).json({
      token,
      user: {
        userId: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

userController.addTodo = async function (req, res) {
  let user;
  try {
    user = await User.updateOne(
      { _id: req.body.userId },
      { $addToSet: { todo: req.body.activityId } }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

userController.removeTodo = async function (req, res) {
  let user;
  try {
    user = await User.updateOne(
      { _id: req.body.userId },
      { $pull: { todo: req.body.activityId } }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// userController.toggleTodo = async function (req, res) {
//   let user;
//   try {
//     user = await User.updateOne(
//       { _id: req.body.userId },
//       { $set: { completed: req.body.completed } }
//     );
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

module.exports = userController;
