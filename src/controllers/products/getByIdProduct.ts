//Models
import { Product } from "src/models/Product";
//Services
import { getById } from "src/services/getById";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
// import { currentDateTime } from "src/helpers/dateTime/dates";
// import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
// import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
// import { validateProductObject } from "src/helpers/validations/models/validateProductObject";


//Const/Vars
// let eventBody;
// let eventHeaders;
// let validateAuth;
// let validateReqParams;
// let validateObject;
// let objProduct;
// let siteId;
// let title;
// let subtitle;
// let sellerId;
// let categoryId;
// let officialStoreId;
// let price;
// let basePrice;
// let originalPrice;
// let initialQuantity;
// let availableQuantity;
// let dateNow;
// let creationDate;
// let updateDate;
// let product;
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
        // validateObject = [];
        // objProduct = null;
        // product = null;
        product = null;

        // //-- start with validation Headers  ---
        // eventHeaders = await event.headers;

        // validateReqParams = await validateHeadersParams(eventHeaders);

        // if (!validateReqParams) {
        //     return await requestResult(
        //         statusCode.BAD_REQUEST,
        //         "Bad request, check missing or malformed headers"
        //     );
        // }

        // validateAuth = await validateAuthHeaders(eventHeaders);

        // if (!validateAuth) {
        //     return await requestResult(
        //         statusCode.UNAUTHORIZED,
        //         "Not authenticated, check x_api_key and Authorization"
        //     );
        // }
        // //-- end with validation Headers  ---

        // //-- start with event body --
        // eventBody = JSON.parse(await event.body);

        // siteId = await eventBody.site_id;
        // title = await eventBody.title;
        // subtitle = await eventBody.subtitle;
        // sellerId = await eventBody.seller_id;
        // categoryId = await eventBody.category_id;
        // officialStoreId = await eventBody.official_store_id;
        // price = await eventBody.price;
        // basePrice = await eventBody.base_price;
        // originalPrice = await eventBody.original_price;
        // initialQuantity = await eventBody.initial_quantity;
        // availableQuantity = await eventBody.available_quantity;
        // dateNow = await currentDateTime();
        // creationDate = dateNow;
        // updateDate = dateNow;

        // //-- start with event body --


        // //-- start with validation Body  ---

        // objProduct = new Product(siteId, title, subtitle, sellerId, categoryId, officialStoreId, price, basePrice, originalPrice, initialQuantity, availableQuantity, creationDate, updateDate);


        // validateObject = await validateProductObject(objProduct);

        // if (validateObject.length) {
        //     return await requestResult(
        //         statusCode.BAD_REQUEST,
        //         `Bad request, check request attributes. Validate the following : ${validateObject}`
        //     );
        // }
        // //-- end with validation Body  ---

        //-- start with db query  ---

        productId = await event.pathParameters.id;

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
