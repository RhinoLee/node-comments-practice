const db = require("../db")
const bcrypt = require("bcrypt");
const systemModel = {
  login: async ({ username, password }) => {
    const query = {
      text: "SELECT * FROM users WHERE username = $1",
      values: [username]
    }

    try {
      const result = await db.query(query)
      const user = result.rows[0]
      console.log("user", user);
      const match = await bcrypt.compare(password, user.password);
      if (!match) return false
      return user
    } catch(err) {
      return false
    }
  },
  register: async ({ username, password, nickname }) => {
    const query = {
      text: "INSERT INTO users(username, password, nickname) VALUES($1, $2, $3)",
      values: [username, password, nickname],
    }

    try {
      const result = await db.query(query)
      return true
    } catch(err) {
      console.log(err);
      return false
    }
  }
};

module.exports = systemModel;
