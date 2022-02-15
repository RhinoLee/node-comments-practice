/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
  CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    username VARCHAR(128) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
  DROP TABLE comments;
  `);
};
