//Helpers Bucket
import { appendBucket } from "src/helpers/bucket/appendBucket";
import { initBucketIfEmpty } from "src/helpers/bucket/initBucket";
import { readBucket } from "src/helpers/bucket/readBucket";
//Models
import { ProductSpecification } from "src/models/Products/ProductSpecification";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { formatToJson } from "src/helpers/format/formatToJson";
import { formatToString } from "src/helpers/format/formatToString";
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateAuthHeaders } from "src/helpers/validations/validator/auth/headers";
import { validateHeadersParams } from "src/helpers/validations/validator/http/requestHeadersParams";
import { currentDateTime } from "src/helpers/dateTime/dates";
import { validateProductSpecificationObject } from "src/helpers/validations/models/validateProductSpecifObject";
import { validatePathParameters } from "src/helpers/http/queryStringParams";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { formatToBigint } from "src/helpers/format/formatToNumber";


//Const/Vars
let eventBody;
let eventHeaders;
let jsonInit;
let bucketContent;
let validateReqParams;
let validateAuth;
let validateBodyAddObject;
let newObject;
let bodyObj;
let validatePathParams:boolean;
let productId: number;
let specificationUuid: string;
let dateNow: string;
let creationDate: string;
let updateDate: string;
let objProductSpecification: ProductSpecification;
let msg: string;
let code: number;

/**
 * @description add an object inside the s3 bucket 
 * @param {Object} event Object type
 * @returns a body response with http code and message.
 */
module.exports.handler = async (event: any) => {
  try {
    //Init
    jsonInit = [];
    bodyObj = null;
    bucketContent = null;
    newObject = null;
    objProductSpecification = null;


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
    productId = await event.pathParameters.productId;

    validatePathParams = await validatePathParameters(productId);

    if (!validatePathParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, the product id passed as a parameter is not valid"
      );
    }
    //-- end with path parameters  ---

    //-- start with validation object  ---
    productId = await formatToBigint(productId);
    specificationUuid = await generateUuidV4();
    dateNow = await currentDateTime();
    creationDate = dateNow;
    updateDate = dateNow;

    objProductSpecification = new ProductSpecification(productId, specificationUuid, creationDate, updateDate);

    validateBodyAddObject = await validateProductSpecificationObject(objProductSpecification);

    if (validateBodyAddObject.length) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        `Bad request, check request attributes. Validate the following : ${validateBodyAddObject}`
      );
    }
    // -- end with validation object  ---


    // //-- start with bucket operations  ---

    // await initBucketIfEmpty();

    // bucketContent = await readBucket();

    // if (bucketContent == null) {
    //   return await requestResult(
    //     statusCode.INTERNAL_SERVER_ERROR,
    //     "An unexpected error has occurred. The object could not be stored inside the bucket."
    //   );
    // }
    //Added unique identificator for the object
    // eventBody.uuid = await generateUUID();

    // bucketContent = await formatToJson(bucketContent);

    // await bucketContent.push(eventBody);

    // newObject = await formatToString(bucketContent);

    // let newObjectResult = await appendBucket(newObject);

    // if (newObjectResult != null) {
    //   return await requestResult(
    //     statusCode.OK,
    //     eventBody
    //   );
    // } else {
    //   return await requestResult(
    //     statusCode.INTERNAL_SERVER_ERROR,
    //     "An unexpected error has occurred. The object could not be stored inside the bucket."
    //   )
    // }

    //-- end with bucket operations  ---

    return await requestResult(
      statusCode.OK,
      eventBody
    );

  } catch (error) {
    msg = `Error in addProductSpecification lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }

}