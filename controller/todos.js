const todosModel = require("../model/todos")
const todosController = {
  getAll: (req, res) => {
    const todos = todosModel.getAll()
    res.render("todos", { todos });
  },
  getTodo: (req, res) => {
    const id = req.params.id;
    const todo = todosModel.getTodo(id)
    res.render("todo", { todo });
  }
}

module.exports = todosController