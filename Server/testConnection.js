const knex = require('knex');

const config = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '6278',
    database: 'taskmanagementsystem',
  },
};

const db = knex(config);

async function testDatabaseConnection() {
  try {
    await db.raw('SELECT 1');
    console.log('Database connection successful');
    process.exit(0);
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

testDatabaseConnection();
