const User = require("../Models/user.model.js");
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

module.exports = userController;
