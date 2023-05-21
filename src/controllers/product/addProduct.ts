//External
import axios from 'axios';
//Models
import { Product } from "src/models/Products/Product";
//Services
import { addProduct } from "src/services/product/addProduct";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { currentDateTime } from "src/helpers/dateTime/dates";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
import { validateProductObject } from "src/helpers/validations/models/validateProductObject";
import { formatToJson } from "src/helpers/format/formatToJson";


//Const/Vars
let eventBody;
let eventHeaders;
let validateAuth;
let validateReqParams;
let validateObject;
let objProduct;
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
let hasSpecification: boolean;
let creationDate;
let updateDate;
let newProduct;
let msg;
let code;


/**
 * @description Add a user according to the parameters passed in the request body
 * @param {Object} event Object type
 * @returns the result of the transaction carried out in the database
 */
module.exports.handler = async (event: any) => {
  try {
    //Init
    validateObject = [];
    objProduct = null;
    newProduct = null;

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

    //-- start with event body --
    eventBody = await formatToJson(event.body);

    siteId = await eventBody.site_id;
    title = await eventBody.title;
    subtitle = await eventBody.subtitle;
    sellerId = await eventBody.seller_id;
    categoryId = await eventBody.category_id;
    officialStoreId = await eventBody.official_store_id;
    price = await eventBody.price;
    basePrice = await eventBody.base_price;
    originalPrice = await eventBody.original_price;
    initialQuantity = await eventBody.initial_quantity;
    availableQuantity = await eventBody.available_quantity;
    dateNow = await currentDateTime();
    hasSpecification = await eventBody.has_specification;
    creationDate = dateNow;
    updateDate = dateNow;

    //-- start with event body --


    //-- start with validation Body  ---

    objProduct = new Product(siteId, title, subtitle, sellerId, categoryId, officialStoreId, price, basePrice, originalPrice, initialQuantity, availableQuantity, hasSpecification, creationDate, updateDate);


    validateObject = await validateProductObject(objProduct);

    if (validateObject.length) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        `Bad request, check request attributes. Validate the following : ${validateObject}`
      );
    }
    //-- end with validation Body  ---

    //-- start with db PRODUCT query  ---

    //newProduct = await addProduct(objProduct);
    newProduct = true;

    if (newProduct == statusName.CONNECTION_REFUSED) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
      );
    }
    else if (newProduct == statusName.CONNECTION_ERROR) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ERROR. An error has occurred in the process operations and queries with the database. Try again"
      );
    }
    else if (newProduct == null) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not add user. Check the values of each attribute and try again"
      );
    }
    //-- end with db PRODUCT query  ---


    //-- start with db PRODUCT_SPECIFICATION query  ---

    if (hasSpecification) {
      const PRODUCT_SPECIFICATION_ENDPOINT = `http://${process.env.API_HOST}:${process.env.API_PORT}/${process.env.API_STAGE}/${process.env.API_VERSION}/${process.env.API_ENDPOINT_PRODUCTS_SPECIFICATIONS_NAME}/add/`

      console.log({'ENDPOINT':PRODUCT_SPECIFICATION_ENDPOINT});

      // TODO implement
      var response = await axios.post(PRODUCT_SPECIFICATION_ENDPOINT, { "data": event.data }, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.X_API_KEY,
          "Authorization": process.env.BEARER_TOKEN
        }
      },).then(response => response)
        .catch((error) => {
          console.log(error);
          return error;
        });
    }

    //-- end with db PRODUCT_SPECIFICATION query  ---

  } catch (error) {
    msg = `Error in addProduct lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }
};
