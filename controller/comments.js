const commentsModel = require("../model/comments");
const commentsController = {
  addComment: async (req, res) => {
    const { username } = req.session;
    const { content } = req.body;

    if (!username || !content) {
      return res.redirect("/");
    }

    const result = await commentsModel.addComment({ username, content });

    return res.redirect("/");
  },
  getAllComments: async (req, res) => {
    const result = await commentsModel.getAllComments();
    if (result) {
      console.log("controller", result);
      res.render("index", { comments: result });
    } else {
      res.render("index", { comments: [] });
    }
  },
};

module.exports = commentsController;