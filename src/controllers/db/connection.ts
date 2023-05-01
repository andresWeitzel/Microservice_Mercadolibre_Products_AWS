//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { dbConnection } from "src/db/config";
import { requestResult } from "src/helpers/http/bodyResponse";
//Const/Vars
let msg;
let code;

/**
 * @description check database connection
 * @param {any} event any type
 * @returns a json object with the message and the authentication code from the database
 */
module.exports.handler = async (event:any) => {
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

    return await requestResult(code, msg);
    //-- end with db query  ---

  } catch (error) {
    console.error(`Error in db connection lambda, caused by ${error}. Stack error type : ${error.stack}`);
  }


};