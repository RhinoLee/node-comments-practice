const todosModel = require("../model/todos");
const todosController = {
  getAll: async (req, res) => {
    try {
      const result = await todosModel.getAll();
      res.render("todos", { todos: result });
    } catch (err) {
      console.log(err);
    }
  },
  getTodo: async (req, res) => {
    const id = req.params.id;
    try {
      const result = await todosModel.getTodo(id);
      res.render("todo", { todo: result });
    } catch (err) {
      console.log(err);
    }
  },
  addTodo: async (req, res) => {
    const content = req.body.content;
    try {
      const result = await todosModel.addTodo(content);
      if (result) res.redirect("/todos");
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = todosController;
