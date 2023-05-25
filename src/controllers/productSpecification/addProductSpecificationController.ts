//Models
import { ProductSpecification } from "src/models/Products/ProductSpecification";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Services
import { addProductSpecifService } from "src/services/productSpecification.ts/addProductSpecifService";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { currentDateTime } from "src/helpers/dateTime/dates";
import { validatePathParameters } from "src/helpers/http/queryStringParams";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { formatToBigint } from "src/helpers/format/formatToNumber";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let validatePathParams: boolean;
let newProductSpecification: any;
let productId: number;
let specificationUuid: string;
let stopTime: string;
let dateNow: string;
let creationDate: string;
let updateDate: string;
let objProductSpecification: ProductSpecification;
let msg: string;
let code: number;
const FIRST_STOP_TIME = "2045-02-10 10:15";

/**
 * @description add an object inside the s3 bucket 
 * @param {Object} event Object type
 * @returns a body response with http code and message.
 */
module.exports.handler = async (event: any) => {
  try {
    //Init
    objProductSpecification = null;
    newProductSpecification = null;


    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys ---

    //-- start with path parameters  ---
    productId = await event.pathParameters.productId;

    validatePathParams = await validatePathParameters(productId);

    if (!validatePathParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, the product id passed as a parameter is not valid"
      );
    }
    //-- end with path parameters  ---

    //-- start with db operation  ---
    productId = await formatToBigint(productId);
    specificationUuid = await generateUuidV4();
    dateNow = await currentDateTime();
    stopTime = FIRST_STOP_TIME;
    creationDate = dateNow;
    updateDate = dateNow;

    objProductSpecification = new ProductSpecification(productId, specificationUuid, stopTime, creationDate, updateDate);

    newProductSpecification = await addProductSpecifService(objProductSpecification);

    return newProductSpecification;

    //-- end with db operation  ---

  } catch (error) {
    msg = `Error in ADD PRODUCT SPECIFICATION CONTROLLER lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }

}