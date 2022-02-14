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
  update: async (req, res) => {
    const { username } = req.session
    const { id } = req.params
    const result = await commentsModel.getComment({ username, id })
    res.render("update", { comment: result })
  },
  updateHandler: async (req, res) => {
    const { username } = req.session
    const { id } = req.params
    const { content } = req.body
    const result = await commentsModel.update({ username, id, content });
    return res.redirect("/")
  },
  delete: async (req, res) => {
    const { username } = req.session
    const { id } = req.params
    const result = await commentsModel.delete({ username, id });
    return res.redirect("/")
  }
};

module.exports = commentsController;
