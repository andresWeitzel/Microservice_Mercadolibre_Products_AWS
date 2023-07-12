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
 
     switch (product) {
      case statusName.CONNECTION_REFUSED:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
        );
      case statusName.CONNECTION_ERROR:
        return await requestResult(
          statusCode.INTERNAL_SERVER_ERROR,
          "ERROR. An error has occurred in the process operations and queries with the database. Try again"
        );
      case null || undefined:
        return await requestResult(
          statusCode.BAD_REQUEST,
          "Bad request, could not get product according to the given CREATION DATE AND TITLE. Check the this and try again"
        );
      default:
        return await requestResult(statusCode.OK, product);
    }


     //-- end with db operations  ---
  
  } catch (error) {
    msg = `Error in GET LIKE CREATION DATE AND TITLE PRODUCT SERVICE function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};




