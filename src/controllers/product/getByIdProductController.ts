//Services
import { getById, getByIdWithoutDate } from "src/services/product/getByIdProductService";
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


        //-- start with db query  ---

        productId = await event.pathParameters.id;

        product = await getById(productId);
        //product = await getByIdWithoutDate(productId);

        return product;
        //-- end with db query  ---


    } catch (error) {
        msg = `Error in getByIdProductController lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
