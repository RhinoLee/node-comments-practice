const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  node_env: process.env.NODE_ENV,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  dbname: process.env.DB_DATABASE,
  dbport: process.env.DB_PORT || 5000,
};