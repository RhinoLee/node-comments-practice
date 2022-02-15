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

if (node_env == "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  module.exports = pool;
  return 
}

if (node_env != "development") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  module.exports = pool;
  return 
}


