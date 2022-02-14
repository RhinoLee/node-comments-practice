const db = require("../db")
const commentsModel = {
  addComment: async ({ username, content }) => {
    const query = {
      text: "INSERT INTO comments(username, content) VALUES($1, $2)",
      values: [username, content]
    }

    try {
      const result = await db.query(query)
      return true
    } catch(err) {
      return false
    }
  },
  getAllComments: async () => {
    const query = {
      text: "SELECT U.nickname, C.content, C.id, C.username FROM comments as C LEFT JOIN users as U on U.username = C.username",
    }

    try {
      const result = await db.query(query)
      return result.rows
    } catch(err) {
      return false
    }
  },
  getComment: async ({ username, id }) => {
    const query = {
      text: `SELECT U.nickname, C.content, C.id, C.username 
            FROM comments as C LEFT JOIN users as U on U.username = C.username
            WHERE U.username = $1 AND C.id = $2`,
      values: [username, id]
    }

    try {
      const result = await db.query(query)
      return result.rows[0] || {}
    } catch(err) {
      return {}
    }
  },
  update: async ({ username, id, content }) => {
    const query = {
      text: "UPDATE comments SET content = $1 WHERE username = $2 AND id = $3",
      values: [content, username, id]
    }

    try {
      const result = await db.query(query)
      return true
    } catch(err) {
      return false
    }
  },
  delete: async({ username, id }) => {
    const query = {
      text: "DELETE FROM comments WHERE username=$1 AND id=$2",
      values: [username, id]
    }

    try {
      const result = await db.query(query)
      return true
    } catch(err) {
      console.log(err);
      return false
    }
  }
}

module.exports = commentsModel