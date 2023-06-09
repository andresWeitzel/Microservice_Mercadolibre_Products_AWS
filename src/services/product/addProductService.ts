
//Models
import { Product } from "src/models/Products/Product";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Repositories
import { addProductRepository } from "src/repositories/product/addProductRepository";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
import { validateProductObject } from "src/helpers/validations/models/validateProductObject";
//Const/Vars
let newProduct: any;
let validateObject: any;
let msg: string;
let code: number;



/**
 * @description call the repository function to add a product
 * @param {Object} inputProduct Object type
 * @returns a json object with the transaction performed
 */
export const addProductService = async function (inputProduct: Product) {
    try {

        //-- start with validation object  ---
        validateObject = await validateProductObject(inputProduct);

        if (validateObject.length) {
            return await requestResult(
                statusCode.BAD_REQUEST,
                `Bad request, check request attributes. Validate the following : ${validateObject}`
            );
        }
        //-- end with validation object  ---

        //-- start with db operations  ---

        newProduct = await addProductRepository(inputProduct);

        switch (newProduct) {
            case statusName.CONNECTION_REFUSED:
              return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available. NOTE: the title together with the subtitle must be unique"
              );
            case statusName.CONNECTION_ERROR:
              return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. NOTE: the title together with the subtitle must be unique"
              );
            case null || undefined:
              return await requestResult(
                statusCode.BAD_REQUEST,
                "Bad request, could not add user. Check the values of each attribute and try again. NOTE: the title together with the subtitle must be unique"
              );
            default:
              return await requestResult(statusCode.OK, newProduct);
          }

        //-- end with db operations  ---

    } catch (error) {
        msg = `Error in ADD PRODUCT SERVICE . Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
}

