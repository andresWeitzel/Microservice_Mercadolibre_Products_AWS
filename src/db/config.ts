//External
 import { Sequelize } from 'sequelize';
 //Enums
const {
  statusCode
} = require("../enums/http/statusCode");
//Const-vars
let msg;
let code;

export const dbConnection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST, 
    dialect: process.env.DATABASE_DIALECT,
    pool: {
      max: parseInt(process.env.DATABASE_POOL_MAX),
      min: parseInt(process.env.DATABASE_POOL_MIN),
      acquire: parseInt(process.env.DATABASE_POOL_ACQUIRE),
      idle: parseInt(process.env.DATABASE_POOL_IDLE)
    }

  }
);

dbConnection.authenticate()
.then(() => {
  msg = 'Connection has been established successfully.';
  code = statusCode.OK;
  console.log(msg);

}).catch((error) => {
  msg = `Unable to connect to the database. Caused by ${error}`;
  code = statusCode.INTERNAL_SERVER_ERROR;
  console.log(msg);
});
