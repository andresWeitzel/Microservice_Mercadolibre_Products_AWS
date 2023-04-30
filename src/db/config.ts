//External
 import { Sequelize } from 'sequelize';
//const { Sequelize } = require('sequelize');


export const dbConnection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST, 
    dialect: process.env.DATABASE_DIALECT
    // pool: {
    //   max: parseInt(process.env.DATABASE_POOL_MAX),
    //   min: parseInt(process.env.DATABASE_POOL_MIN),
    //   acquire: parseInt(process.env.DATABASE_POOL_ACQUIRE),
    //   idle: parseInt(process.env.DATABASE_POOL_IDLE)
    // }

  }
);
