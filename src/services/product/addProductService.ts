
//Models
import { Product } from "src/models/Products/Product";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
//Repository
import { addProductRepository } from "src/repositories/product/addProductRepository";
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

        if (newProduct == statusName.CONNECTION_REFUSED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
            );
        }
        else if (newProduct == statusName.CONNECTION_ERROR) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again"
            );
        }
        else if (newProduct == null) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not add user. Check the values of each attribute and try again"
            );
        }

        return await requestResult(
            statusCode.OK,
            newProduct
        );
        //-- end with db operations  ---

    } catch (error) {
        msg = `Error in ADD PRODUCT SERVICE . Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
}

