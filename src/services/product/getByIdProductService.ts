//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { validatePathParameters } from "src/helpers/http/queryStringParams";
import { requestResult } from "src/helpers/http/bodyResponse";
//Repositories
import { getByIdProductRepository, getByIdProductRepositoryWithoutDate } from "src/repositories/product/getByIdProductRepository";
//Const/Vars
let product: any;
let msg: string;
let validatePathParams: boolean;

/**
 * @description Get a product with all the attributes from the database according to the id passed as a parameter
 * @param {Number} inputProductId Number type
 * @returns a Product according to his id
 * @example
 */
export const getByIdProductService = async function (inputProductId: number) {
  try {
    //-- start with check path parameters  ---

    validatePathParams = await validatePathParameters(inputProductId);

    if (!validatePathParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, the id passed as a parameter is not valid"
      );
    }
    //-- end with check path parameters  ---

    //-- start with db operations  ---
    product = await getByIdProductRepository(inputProductId);
    //product = await getByIdWithoutDate(productId);

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
        "Bad request, could not get product according to the given ID. Check the ID and try again"
      );
    } else {
      return await requestResult(statusCode.OK, product);
    }
    //-- end with db operations  ---
  } catch (error) {
    msg = `Error in GET BY ID PRODUCT SERVICE function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};


/**
 * @description Get a product with all the attributes without date from the database according to the id passed as a parameter
 * @param {Number} inputProductId Number type
 * @returns a Product according to his id
 * @example
 */
export const getByIdProductServiceWithoutDate = async function (inputProductId: number) {
  try {
    //-- start with check path parameters  ---

    validatePathParams = await validatePathParameters(inputProductId);

    if (!validatePathParams) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        "Bad request, the id passed as a parameter is not valid"
      );
    }
    //-- end with check path parameters  ---

    //-- start with db query  ---
    product = await getByIdProductRepositoryWithoutDate(inputProductId);
    //product = await getByIdWithoutDate(productId);

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
    else if (product == null) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not get product according to the given ID. Check the ID and try again"
      );
    } else {
      return await requestResult(statusCode.OK, product);
    }
    //-- end with db query  ---
  } catch (error) {
    msg = `Error in getByIdProductServiceWithoutDate function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};
