//Models
import { Product } from "src/models/Product";
//Services
import { addProduct } from "src/services/addProduct";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { currentDateTime } from "src/helpers/dateTime/dates";
// const {
//   validateHeadersParams,
// } = require("../../helpers/http/requestHeadersParams");
// const {
//   validateBodyAddUserParams,
// } = require("../../helpers/http/users/requestBodyAddUserParams");
// const { validateAuthHeaders } = require("../../helpers/auth/headers");


//Const/Vars
let newUser;
let eventBody;
let eventHeaders;
let validateAuth;
let validateReqParams;
let validateReqBodyParams;
let siteId;
let title;
let subtitle;
let sellerId;
let categoryId;
let officialStoreId;
let price;
let basePrice;
let originalPrice;
let initialQuantity;
let availableQuantity;
let dateNow;
let creationDate;
let updateDate;
let newProduct;
let msg;
let code;

/**
 * @description add a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event:any) => {
    try {
        //Init
        newUser = null;

        // //-- start with validation Headers  ---
        // eventHeaders = await event.headers;

        // validateReqParams = await validateHeadersParams(eventHeaders);

        // if (!validateReqParams) {
        //   return await requestResult(
        //     statusCode.BAD_REQUEST,
        //     "Bad request, check missing or malformed headers",
        //     event
        //   );
        // }

        // validateAuth = await validateAuthHeaders(eventHeaders);

        // if (!validateAuth) {
        //   return await requestResult(
        //     statusCode.UNAUTHORIZED,
        //     "Not authenticated, check x_api_key and Authorization",
        //     event
        //   );
        // }
        // //-- end with validation Headers  ---

        // //-- start with validation Body  ---

        // eventBody = JSON.parse(await event.body);

        // validateReqBodyParams = await validateBodyAddUserParams(eventBody);

        // if (!validateReqBodyParams) {
        //   return await requestResult(
        //     statusCode.BAD_REQUEST,
        //     "Bad request, check request attributes. Missing or incorrect",
        //     event
        //   );
        // }
        // //-- end with validation Body  ---

        //-- start with db query  ---


        siteId = eventBody.site_id;
        title = eventBody.title;
        subtitle = eventBody.subtitle;
        sellerId = eventBody.seller_id;
        categoryId = eventBody.category_id;
        officialStoreId = eventBody.official_store_id;
        price = eventBody.price;
        basePrice = eventBody.base_price;
        originalPrice = eventBody.original_price;
        initialQuantity = eventBody.initial_quantity;
        availableQuantity = eventBody.availableQuantity;
        dateNow = await currentDateTime();
        creationDate = dateNow;
        updateDate = dateNow;



        newProduct = new Product(siteId, title, subtitle, sellerId, categoryId, officialStoreId, price, basePrice, originalPrice, initialQuantity, availableQuantity, creationDate, updateDate);


        newUser = await addProduct(newProduct);

        if (newUser == statusName.CONNECTION_REFUSED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
            );
        }
        else if (newUser == statusName.CONNECTION_ERROR) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again"
            );
        }
        else if (newUser == null) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not add user. Check the values of each attribute and try again"
            );
        } else {
            return await requestResult(statusCode.OK, newUser);
        }

        //-- end with db query  ---
    } catch (error) {
        msg = `Error in addUser lambda. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
