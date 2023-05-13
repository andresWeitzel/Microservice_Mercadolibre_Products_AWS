//Services
import { getAll } from "src/services/product/getAll";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";


//Const/Vars
let eventHeaders;
let validateAuth;
let validateReqParams;
let pageSizeNro: number;
let pageNro: number;
let queryStrParams;
let productList:any;
let msg;
let code;
const orderBy = [["id", "ASC"]];

/**
 * @description Get all paginated productLists from the database
 * @param {Object} event Object type
 * @returns all paginated productList objects and status code
 */
module.exports.handler = async (event: any) => {
    try {
        //Init
        productList = null;
        pageSizeNro = 5;
        pageNro = 0;

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

        //-- start with pagination  ---
        queryStrParams = event.queryStringParameters;

        if (queryStrParams != null) {
            pageSizeNro = parseInt(await event.queryStringParameters.limit);
            pageNro = parseInt(await event.queryStringParameters.page);
        }
        //-- end with pagination  ---

        //-- start with db query  ---
        productList = await getAll(pageSizeNro, pageNro, orderBy);
        // userList = await getAllWithoutDate(pageSizeNro, pageNro, orderBy);

        if (productList == statusName.CONNECTION_REFUSED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
            );
        }
        else if (productList == statusName.CONNECTION_ERROR) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again"
            );
        }
        else if (productList == null) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not get a paginated product list. Check the ID and try again"
            );
        } else {
            return await requestResult(statusCode.OK, productList);
        }
        //-- end with db query  ---


    } catch (error) {
        msg = `Error in getAllProduct lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
