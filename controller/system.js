const systemController = {
  login: (req, res) => {
    if (req.body.password === "abc") {
      req.session.isLogin = true
      // console.log("login set session", req.session.isLogin);
      res.redirect("/")
    } else {
      req.session.isLogin = false
      req.flash("errorMessage", "Please input correct password")
      res.redirect("/login")
    }
  },
  logout: (req, res) => {
    req.session.isLogin = false
    res.redirect("/login")
  }
};

module.exports = systemController;
