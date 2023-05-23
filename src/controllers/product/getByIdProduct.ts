//Services
import { getById, getByIdWithoutDate } from "src/services/product/getById";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validatePathParameters } from "src/helpers/http/queryStringParams";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";


//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let validatePathParams;
let productId;
let product;
let msg;
let code;

/**
 * @description Get a product from the database according to the id passed as a parameter
 * @param {Object} event Object type
 * @returns a Product object according to his id and status code
 */
module.exports.handler = async (event: any) => {
    try {
        //Init
        product = null;

        //-- start with validation headers and keys  ---
        eventHeaders = await event.headers;

        checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

        if (checkEventHeadersAndKeys != null) {
            return checkEventHeadersAndKeys;
        }

        //-- end with validation headers and keys ---

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
        //product = await getByIdWithoutDate(productId);

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
