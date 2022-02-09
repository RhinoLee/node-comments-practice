const todos = ["first todo", "second todo", "third todo"];

const todosModel = {
  getAll: () => todos,
  getTodo: (id) => todos[id]
}

module.exports = todosModel