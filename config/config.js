require('dotenv').config();
module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: 'CICD_DB',
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  },

  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PW,
    database: 'CICD_test',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },

  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
