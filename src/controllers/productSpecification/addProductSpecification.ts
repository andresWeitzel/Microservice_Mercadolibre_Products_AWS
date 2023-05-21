//Models
import { ProductSpecification } from "src/models/Products/ProductSpecification";
//Enums
import { statusCode } from "src/enums/http/statusCode";
import { statusName } from "src/enums/connection/statusName";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
import { currentDateTime } from "src/helpers/dateTime/dates";
import { validateProductSpecificationObject } from "src/helpers/validations/models/validateProductSpecifObject";
import { validatePathParameters } from "src/helpers/http/queryStringParams";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { formatToBigint } from "src/helpers/format/formatToNumber";
import { addProductSpecification } from "src/services/productSpecification.ts/addProductSpecification";



//Const/Vars
let eventHeaders;
let validateReqParams;
let validateAuth;
let validateBodyAddObject;
let validatePathParams: boolean;
let newProductSpecification:any;
let productId: number;
let specificationUuid: string;
let stopTime:string;
let dateNow: string;
let creationDate: string;
let updateDate: string;
let objProductSpecification: ProductSpecification;
let msg: string;
let code: number;
const FIRST_STOP_TIME="2045-02-10 10:15";

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
    //productId = await event.pathParameters.productId;

    // validatePathParams = await validatePathParameters(productId);

    // if (!validatePathParams) {
    //   return await requestResult(
    //     statusCode.BAD_REQUEST,
    //     "Bad request, the product id passed as a parameter is not valid"
    //   );
    // }
    //-- end with path parameters  ---

    //-- start with validation object  ---
    // productId = await formatToBigint(productId);
    // specificationUuid = await generateUuidV4();
    // dateNow = await currentDateTime();
    // stopTime=FIRST_STOP_TIME;
    // creationDate = dateNow;
    // updateDate = dateNow;

    // objProductSpecification = new ProductSpecification(productId, specificationUuid, stopTime, creationDate, updateDate);

    // validateBodyAddObject = await validateProductSpecificationObject(objProductSpecification);

    // if (validateBodyAddObject.length) {
    //   return await requestResult(
    //     statusCode.BAD_REQUEST,
    //     `Bad request, check request attributes. Validate the following : ${validateBodyAddObject}`
    //   );
    // }
    // -- end with validation object  ---


    //-- start with db query  ---

    // newProductSpecification = await addProductSpecification(objProductSpecification);

    // if (newProductSpecification == statusName.CONNECTION_REFUSED) {
    //   return await requestResult(
    //     statusCode.INTERNAL_SERVER_ERROR,
    //     "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active, available, id is valid or exist"
    //   );
    // }
    // else if (newProductSpecification == statusName.CONNECTION_ERROR) {
    //   return await requestResult(
    //     statusCode.INTERNAL_SERVER_ERROR,
    //     "ERROR. An error has occurred in the process operations and queries with the database. Try again"
    //   );
    // }
    // else if (newProductSpecification == null) {
    //   return await requestResult(
    //     statusCode.INTERNAL_SERVER_ERROR,
    //     "Bad request, could not add user. Check the values of each attribute and try again"
    //   );
    // } else {
    //   return await requestResult(statusCode.OK, newProductSpecification);
    // }

    console.log('INVOKE');
    return await requestResult(statusCode.OK, 'INVOKE');

    //-- end with db query  ---
  } catch (error) {
    msg = `Error in addProductSpecification lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }

}