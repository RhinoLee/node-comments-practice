const { Pool } = require('pg')
const { username, password, host, dbname, dbport } = require("./config")
const pool = new Pool({
  user: username,
  host: host,
  database: dbname,
  password: password,
  port: dbport,
});

// pool.connect();
// const query = {
//   text: 'SELECT * FROM todos'
// }

// pool.query(query, (err, res) => {
//   // 連線成功會顯示當前時間
//   console.log(err, res.rows);
// });

module.exports = pool
