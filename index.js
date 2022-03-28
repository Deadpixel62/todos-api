const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
require("dotenv").config();

const Port = process.env.PORT || 4002;
const Url = process.env.URL;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Server connected on Port: ${Port}`);
});

const userRouter = require("./Routes/user.routes");
const todoRouter = require("./Routes/todo.routes");

mongoose.connect(Url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("open", () => {
  console.log("connected to database MongoDb");
});

app.use("/", userRouter);
app.use("/", todoRouter);

app.listen(Port, () => console.log(`Server connected on port: ${Port}`));
