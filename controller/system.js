const systemModel = require("../model/system");
const bcrypt = require("bcrypt");
const systemController = {
  login: async (req, res) => {
    const { username, password } = req.body

    if (!username) {
      req.flash("errorMessage", "請輸入使用者名稱")
      res.redirect("/login")
      return 
    }
    if (!password) {
      req.flash("errorMessage", "請輸入密碼")
      res.redirect("/login")
      return 
    }


    const result = await systemModel.login({ username, password })

    if (result) {
      req.session.username = username
      res.redirect("/")
    } else {
      req.flash("errorMessage", "帳號或密碼輸入錯誤")
      res.redirect("/login")
    }
  },
  logout: (req, res) => {
    req.session.isLogin = false;
    req.session.username = null;
    res.redirect("/");
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
