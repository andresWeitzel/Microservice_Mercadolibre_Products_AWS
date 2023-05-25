//Services
import { getAllProductService } from "src/services/product/getAllProductService";
//Enums
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateHeadersAndKeys } from "src/helpers/validations/headers/validateHeadersAndKeys";
import { formatToBigint } from "src/helpers/format/formatToNumber";

//Const/Vars
let eventHeaders: any;
let checkEventHeadersAndKeys: any;
let pageSizeNro: number;
let pageNro: number;
let productList: any;
let msg: string;
let code: number;
const orderBy = [["id", "ASC"]];

/**
 * @description Get all paginated productLists from the database
 * @param {Object} event Object type
 * @returns all paginated productList objects and status code
 */
module.exports.handler = async (event: any) => {
  try {
    //Inits
    productList = null;
    pageSizeNro = 5;
    pageNro = 0;

    //-- start with validation headers and keys  ---
    eventHeaders = await event.headers;

    checkEventHeadersAndKeys = await validateHeadersAndKeys(eventHeaders);

    if (checkEventHeadersAndKeys != null) {
      return checkEventHeadersAndKeys;
    }

    //-- end with validation headers and keys ---

    //-- start with pagination  ---
    let paramPageSizeNro = await formatToBigint(event.queryStringParameters.limit);
    let paramPageNro = await formatToBigint(event.queryStringParameters.page);

    pageSizeNro =
      (paramPageSizeNro != null &&
      paramPageSizeNro != undefined &&
      !isNaN(paramPageSizeNro))
        ? paramPageSizeNro
        : pageSizeNro;

    pageNro =
      (paramPageNro != null && paramPageNro != undefined && !isNaN(paramPageNro))
        ? paramPageNro
        : pageNro;

    //-- end with pagination  ---

    //-- start with db query  ---
    productList = await getAllProductService(pageSizeNro, pageNro, orderBy);
    //-- end with db query  ---

    return productList;
  } catch (error) {
    msg = `Error in GET ALL PRODUCT CONTROLLER lambda. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }
};
