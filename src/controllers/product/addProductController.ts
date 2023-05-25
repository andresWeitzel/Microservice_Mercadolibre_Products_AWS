//Models
import { Product } from "src/models/Products/Product";
//Services
import { addProductService } from "src/services/product/addProductService";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { currentDateTime } from "src/helpers/dateTime/dates";
import { validateProductObject } from "src/helpers/validations/models/validateProductObject";
import { formatToJson } from "src/helpers/format/formatToJson";
import { getLikeCreationDateAndTitle } from 'src/services/product/getLikeCreationDateAndTitle';
import { getAddedProductSpecificationObject } from 'src/helpers/axios/sendRequest';
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";


//Const/Vars
let eventBody;
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
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


    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }

    //-- end with validation headers and keys ---

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

    newProduct = await addProductService(objProduct);

    //-- end with db PRODUCT query  ---


    //-- start with db PRODUCT_SPECIFICATION query  ---

    if (hasSpecification && (newProduct.statusCode = statusCode.OK)) {

      let addedProductObject = await getLikeCreationDateAndTitle(title, creationDate);

      let idAddedProductObject = await addedProductObject[0].dataValues.id;

      const PRODUCT_SPECIFICATION_ENDPOINT = `http://${process.env.API_HOST}:${process.env.API_PORT}/${process.env.API_STAGE}/${process.env.API_VERSION}/${process.env.API_ENDPOINT_PRODUCTS_SPECIFICATIONS_NAME}/add/${idAddedProductObject}`;

      let headers = {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.X_API_KEY,
          "Authorization": process.env.BEARER_TOKEN
        }
      };

      let addedProductSpecificationObject = await getAddedProductSpecificationObject(PRODUCT_SPECIFICATION_ENDPOINT, null, headers);

      let objectsList = [];
      objectsList.push(objProduct);
      objectsList.push(addedProductSpecificationObject.data.message);

      return await requestResult(statusCode.OK, objectsList);
    }
    //-- end with db PRODUCT_SPECIFICATION query  ---

    return newProduct;

  } catch (error) {
    msg = `Error in addProductController lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }
};
