const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const { dbport } = require("./config");
const port = (process.env.PORT || dbport);
const db = require("./db");
const systemController = require("./controller/system");
const commentsController = require("./controller/comments");
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

app.get("/", commentsController.getAllComments);

app.get("/login", systemController.loginPage);
app.post("/login", systemController.loginHandler);
app.get("/logout", systemController.logout);
app.get("/register", systemController.registerPage)
app.post("/register", systemController.register)

app.post("/comments", commentsController.addComment)
app.get("/comments/delete/:id", commentsController.delete)
app.get("/comments/update/:id", commentsController.update)
app.post("/comments/update/:id", commentsController.updateHandler)

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on port ${port}`);
});
