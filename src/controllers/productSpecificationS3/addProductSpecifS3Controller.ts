//Models
import { ProductSpecificationS3 } from "src/models/S3/ProductSpecification";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { generateUuidV4 } from "src/helpers/math/generateUuid";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { initBucketIfEmpty } from "src/helpers/bucket/initBucket";
import { readBucket } from "src/helpers/bucket/readBucket";
import { formatToJson } from "src/helpers/format/formatToJson";

//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let specificationUuid:string;
let objProductSpecificationS3:any;
let pdfFile:string;
let bucketContent:any;
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
    eventHeaders=null;
    objProductSpecificationS3=null;
    pdfFile=null;
    bucketContent=null;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }
    //-- end with validation headers and keys ---

    
     //-- start with bucket operations  ---

 
    specificationUuid = await event.pathParameters.specificationUuid;
    pdfFile = await event.body.pdf_file;
    console.log({'EVENT PDF FILE':pdfFile});
    console.log({'EVENT':event.body});

    // objProductSpecificationS3 = new ProductSpecificationS3(specificationUuid, pdfFile);

    return await requestResult(
          statusCode.OK,event
        )

    // await initBucketIfEmpty();

    // bucketContent = await readBucket();

    // if (bucketContent == null) {
    //   return await requestResult(
    //     statusCode.INTERNAL_SERVER_ERROR,
    //     "An unexpected error has occurred. The object could not be stored inside the bucket."
    //   );
    // }
    // //Added unique identificator for the object
    // eventBody.uuid = await generateUuidV4();

    // bucketContent = await formatToJson(bucketContent);

    // await bucketContent.push(eventBody);

    // newObject = await formatToString(bucketContent);

    // let newObjectResult = await appendBucket(newObject);

    // if (newObjectResult != null) {
    //   return await bodyResponse(
    //     statusCode.OK,
    //     eventBody
    //   );
    // } else {
    //   return await bodyResponse(
    //     statusCode.INTERNAL_SERVER_ERROR,
    //     "An unexpected error has occurred. The object could not be stored inside the bucket."
    //   )
    // }

    //-- end with bucket operations  ---

  } catch (error) {
    msg = `Error in ADD PRODUCT SPECIFICATION S3 CONTROLLER lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }

}