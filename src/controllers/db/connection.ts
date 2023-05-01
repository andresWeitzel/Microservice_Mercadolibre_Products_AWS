//dbConfig
const { dbConnection } = require('../../db/config');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');
//Const/Vars
let msg;
let code;


module.exports.handler = async (event) => {

  try {
    msg = null;
    code = null;

    //-- start with db query  ---
    await dbConnection.authenticate()
      .then(() => {
        msg = 'Database connection has been established successfully.';
        code = statusCode.OK;
        console.log(msg);

      }).catch((error) => {
        msg = `Unable to connect to the database. caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.log(error);

      });

    return await requestResult(code, msg, event);
    //-- end with db query  ---

  } catch (error) {
    console.error(`Error in db connection lambda, caused by ${error}. Stack error type : ${error.stack}`);
  }


};