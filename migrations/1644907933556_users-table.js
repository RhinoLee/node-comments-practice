/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.sql(`
  CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(32) NOT NULL,
    username VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(128) NOT NULL
  )
  `)
};

exports.down = pgm => {
  pgm.sql(`
    DROP TABLE users;
  `)
};
