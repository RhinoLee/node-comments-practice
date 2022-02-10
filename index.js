const express = require("express");
const app = express();
const port = 5001;
const db = require("./db")
const todosController = require("./controller/todos")

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Index");
});

app.get("/hello", (req, res) => {
  res.render("hello");
});

app.get("/todos", todosController.getAll);

app.get("/todos/:id", todosController.getTodo);

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});
