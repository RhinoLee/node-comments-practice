const { Pool } = require("pg");
let pool = null;
const {
  node_env,
  username,
  password,
  host,
  dbname,
  dbport,
} = require("./config");

if (node_env === "development") {
  pool = new Pool({
    user: username,
    host: host,
    database: dbname,
    password: password,
    port: dbport,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return pool;
}

if (node_env !== "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  return pool;
}

// pool.connect();
// const query = {
//   text: 'SELECT * FROM todos'
// }

// pool.query(query, (err, res) => {
//   // 連線成功會顯示當前時間
//   console.log(err, res.rows);
// });

module.exports = pool;
