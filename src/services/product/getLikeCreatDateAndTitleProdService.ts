//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from 'src/enums/http/statusCode';
//Repositories
import { getLikeCreatDateAndTitleProdRepository } from 'src/repositories/product/getLikeCreatDateAndTitleProdRepository';
//Helpers
import { requestResult } from 'src/helpers/http/bodyResponse';
//Const/Vars
let product: any;
let msg: string

/**
 * @description Get a product with all the attributes from the database according to the creation date and title passed as a parameter
 * @param {string} title string type
 * @param {string} creationDate string type
 * @returns a Product according to his title and creation date
 * @example
 */
export const getLikeCreatDateAndTitleProdService = async function (title: string, creationDate:string) {
  try {
     //-- start with db operations  ---
     product = await getLikeCreatDateAndTitleProdRepository(title, creationDate);
 
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
     else if (product == null || !(product.length)) {
       return await requestResult(
         statusCode.INTERNAL_SERVER_ERROR,
         "Bad request, could not get product according to the given title and creation date. Check the ID and try again"
       );
     } else {
       return await requestResult(statusCode.OK, product);
     }
     //-- end with db operations  ---
  
  } catch (error) {
    msg = `Error in GET LIKE CREATION DATE AND TITLE PRODUCT SERVICE function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};




