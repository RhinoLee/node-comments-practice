const db = require("../db");
const todos = ["first todo", "second todo", "third todo"];

const todosModel = {
  getAll: async () => {
    const query = {
      text: "SELECT * FROM todos",
    };
    try {
      const res = await db.query(query);
      return res.rows
    } catch (err) {
      return err
    }
  },
  getTodo: async (id) => {
    const query = {
      text: "SELECT * FROM todos WHERE id = $1",
      values: [id],
    };

    try {
      const res = await db.query(query);
      return res.rows[0]
    } catch (err) {
      return err
    }
  },
};

module.exports = todosModel;
