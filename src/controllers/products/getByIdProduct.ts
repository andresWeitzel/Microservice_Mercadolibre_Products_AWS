//Services
import { getById } from "src/services/getById";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
// import { currentDateTime } from "src/helpers/dateTime/dates";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
import { validatePathParameters } from "src/helpers/http/queryStringParams";
// import { validateProductObject } from "src/helpers/validations/models/validateProductObject";


//Const/Vars
let eventHeaders;
let validateAuth;
let validateReqParams;
let validatePathParams;
let productId;
let product;
let msg;
let code;

/**
 * @description add a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event: any) => {
    try {
        //Init
        product = null;

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

        //-- start with path parameters  ---
        productId = await event.pathParameters.id;

        validatePathParams = await validatePathParameters(productId);

        if (!validatePathParams) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                "Bad request, the id passed as a parameter is not valid"
            );
        }
        //-- end with path parameters  ---

        //-- start with db query  ---
        product = await getById(productId);

        if (product == statusName.CONNECTION_REFUSED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
            );
        }
        else if (product == statusName.CONNECTION_ERROR) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again"
            );
        }
        else if (product == null) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not get product according to the given ID. Check the ID and try again"
            );
        } else {
            return await requestResult(statusCode.OK, product);
        }
        //-- end with db query  ---


    } catch (error) {
        msg = `Error in getById lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
