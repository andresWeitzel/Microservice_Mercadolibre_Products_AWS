//Services
import { getByIdProductService, getByIdProductServiceWithoutDate } from "src/services/product/getByIdProductService";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let productId: number;
let product: any;
let msg: string;
let code: number;

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

        product = await getByIdProductService(productId);
        //product = await getByIdProductServiceWithoutDate(productId);

        return product;
        //-- end with db query  ---

    } catch (error) {
        msg = `Error in getByIdProductController lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
