
//Models
import { ProductSpecification } from "src/models/Products/ProductSpecification";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { validateProductSpecificationObject } from "src/helpers/validations/models/validateProductSpecifObject";
import { requestResult } from "src/helpers/http/bodyResponse";
//Repositories
import { addProductSpecifRepository } from "src/repositories/productSpecification/addProductSpecifRepository";
//Const/Vars
let validateBodyAddObject: any;
let newProductSpecification: any;
let msg: string;
let code: number;


/**
 * @description add product to database
 * @param {Object} inputProductSpecif Object type
 * @returns a json object with the transaction performed
 */
export const addProductSpecifService = async function (inputProductSpecif: ProductSpecification) {
  try {

    //-- start with validation object  ---
    validateBodyAddObject = await validateProductSpecificationObject(inputProductSpecif);

    if (validateBodyAddObject.length) {
      return await requestResult(
        statusCode.BAD_REQUEST,
        `Bad request, check request attributes. Validate the following : ${validateBodyAddObject}`
      );
    }
    // -- end with validation object  ---


    //-- start with db operation  ---

    newProductSpecification = await addProductSpecifRepository(inputProductSpecif);

    if (newProductSpecification == statusName.CONNECTION_REFUSED) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active, available, id is valid or exist"
      );
    }
    else if (newProductSpecification == statusName.CONNECTION_ERROR) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "ERROR. An error has occurred in the process operations and queries with the database. Try again"
      );
    }
    else if (newProductSpecification == null) {
      return await requestResult(
        statusCode.INTERNAL_SERVER_ERROR,
        "Bad request, could not add user. Check the values of each attribute and try again"
      );
    } else {
      return await requestResult(statusCode.OK, newProductSpecification);
    }
    //-- end with db operation  ---
  } catch (error) {
    msg = `Error in ADD PRODUCT SPECIFICATION SERVICE function. Caused by ${error}`;
    code = statusCode.INTERNAL_SERVER_ERROR;
    console.error(`${msg}. Stack error type : ${error.stack}`);

    return await requestResult(code, msg);
  }
}

