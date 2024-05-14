const bodparser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const UserController = require("./controller/userController");
require("dotenv").config();

const uri = process.env.URI;
const app = express();
const port = process.env.PORT;

mongoose
  .connect(uri, {})
  .then(() => console.log("database connected succesfully"))
  .catch((err) => console.log(err));

app.use(bodparser.json());
app.use(bodparser.urlencoded({ extended: false }));

app.get("/api", async (req, res) => {
  res.send("hai ngapai kesini?");
});

app.get("/api/user", async (req, res) => {
  UserController.getAllUsers(req, res);
});

app.get("/api/user/:id", async (req, res) => {
  UserController.getUserById(req, res);
});

app.post("/api/register", async (req, res) => {
  UserController.createUser(req, res);
});

app.listen(port, () => {
  console.log(`listening at port http://localhost:${port}`);
});
