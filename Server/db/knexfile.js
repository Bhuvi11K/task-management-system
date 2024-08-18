const knex = require('knex');

const db = knex({
  client: 'mysql', 
  connection: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: process.env.DATABASE,
  },
});

module.exports = db;