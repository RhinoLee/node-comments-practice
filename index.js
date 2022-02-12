const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const port = 5001;
const db = require("./db");
const todosController = require("./controller/todos");
const systemController = require("./controller/system");
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.set("view engine", "ejs");
app.use(jsonParser);
app.use(urlencodedParser);
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isLogin = req.session.isLogin;
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.get("/", (req, res) => {
  res.render("index");
  // res.render("addTodo");
});
app.post("/todos", todosController.addTodo);
app.get("/todos", todosController.getAll);
app.get("/todos/:id", todosController.getTodo);

app.get("/login", (req, res) => {
  res.render("login");
});
app.post("/login", systemController.login);
app.get("/logout", systemController.logout);
app.get("/register", systemController.registerPage)
app.post("/register", systemController.register)

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});
