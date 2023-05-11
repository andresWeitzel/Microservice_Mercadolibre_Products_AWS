//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { dbConnection } from "src/db/config";
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
//Const/Vars
let msg;
let code;
let eventHeaders;
let validateReqParams;
let validateAuth;

/**
 * @description check database connection
 * @param {any} event any type
 * @returns a json object with the message and the authentication code from the database
 */
module.exports.handler = async (event:any) => {
  try {
    msg = null;
    code = null;
    eventHeaders=null;
    validateReqParams=null;
    validateAuth=null;


       //-- start with validation Headers  ---
       eventHeaders = await event.headers;

       validateReqParams = await validateHeadersParams(eventHeaders);

       if (!validateReqParams) {
         return await requestResult(
           statusCode.BAD_REQUEST,
           "Bad request, check missing or malformed headers"
         );
       }

       validateAuth = await validateAuthHeaders(eventHeaders);

       if (!validateAuth) {
         return await requestResult(
           statusCode.UNAUTHORIZED,
           "Not authenticated, check x_api_key and Authorization"
         );
       }
       //-- end with validation Headers  ---

    //-- start with db query  ---
    await dbConnection.authenticate()
      .then(() => {
        msg = 'Database connection has been established successfully.';
        code = statusCode.OK;

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