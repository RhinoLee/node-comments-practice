const db = require("../db")
const systemModel = {
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
