import { config } from 'dotenv';
config()

const development = {
  username: "root",
  password: process.env.SEQUELIZE_DEVELOPEMENT_PASSWORD,
  database: process.env.SEQUELIZE_DEVELOPEMENT,
  host: "127.0.0.1",
  dialect: "mysql",
  operatorsAliases: 'false',
};
const test = {
  username: "root",
  password: process.env.SEQUELIZE_DEVELOPEMENT_PASSWORD,
  database: process.env.SEQUELIZE_TEST,
  host: "127.0.0.1",
  dialect: "mysql"
};
const production = {
  username: process.env.SEQUELIZE_PRODUCTION_ID,
  password: process.env.SEQUELIZE_PRODUCTION_PASSWORD,
  database: process.env.SEQUELIZE_PRODUCTION_DBNAME,
  host: process.env.SEQUELIZE_PRODUCTION_HOST,
  dialect: "mysql",
  operatorsAliases: 'false',
  logging: false,
};

export default {development, production, test}