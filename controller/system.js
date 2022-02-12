const systemModel = require("../model/system");
const bcrypt = require("bcrypt");
const systemController = {
  login: (req, res) => {
    if (req.body.password === "abc") {
      req.session.isLogin = true;
      // console.log("login set session", req.session.isLogin);
      res.redirect("/");
    } else {
      req.session.isLogin = false;
      req.flash("errorMessage", "Please input correct password");
      res.redirect("/login");
    }
  },
  logout: (req, res) => {
    req.session.isLogin = false;
    req.session.username = null;
    res.redirect("/login");
  },
  registerPage: (req, res) => {
    res.render("../views/system/register.ejs");
  },
  register: (req, res) => {
    const { username, password, nickname } = req.body;

    if (!username || !password || !nickname) {
      req.flash("errorMessage", "尚有欄位未填寫")
      res.redirect("/register");
    }

    console.log(123);

    bcrypt.hash(password, 10, async (err, hash) => {
      const result = await systemModel.register({
        username,
        password: hash,
        nickname,
      });

      if (result) {
        req.session.username = username;
        res.redirect("/")
      } else {
        req.flash("errorMessage", "註冊失敗")
        res.redirect("/register")
      }
    });
  },
};

module.exports = systemController;
