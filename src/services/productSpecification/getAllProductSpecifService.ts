//Enums
import { statusName } from "src/enums/connection/statusName";
import { statusCode } from "src/enums/http/statusCode";
//Repositories
import { getAllProductSpecifRepository } from "src/repositories/productSpecification/getAllProductSpecifRepository";
//Helpers
import { requestResult } from "src/helpers/http/bodyResponse";
//Const/Vars
let msg:string;
let code:number;
let productSpecifList: any;

/**
 * @description Get all paged products with all the attributes from the database according to the id passed as a parameter
 * @param {Number} inputPageSizeNro Number type
 * @param {Number} inputPageNro Number type
 * @param {Object} inputOrderBy Array Object type
 * @returns a list of paginated products
 */
export const getAllProductSpecifService = async function (inputPageSizeNro: number, inputPageNro: number, inputOrderBy: any) {
    try {

        //-- start with db query  ---
        productSpecifList = await getAllProductSpecifRepository(inputPageSizeNro, inputPageNro, inputOrderBy);
        // userList = await getAllWithoutDate(inputPageSizeNro, inputPageNro, inputOrderBy);

        if (productSpecifList == statusName.CONNECTION_REFUSED) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ECONNREFUSED. An error has occurred with the connection or query to the database. Verify that it is active or available"
            );
        }
        else if (productSpecifList == statusName.CONNECTION_ERROR) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "ERROR. An error has occurred in the process operations and queries with the database. Try again"
            );
        }
        else if (productSpecifList == null || !(productSpecifList.length)) {
            return await requestResult(
                statusCode.INTERNAL_SERVER_ERROR,
                "Bad request, could not get a paginated product specification list. Try again"
            );
        } else {
            return await requestResult(statusCode.OK, productSpecifList);
        }
        //-- end with db query  ---


    } catch (error) {
        msg = `Error in GET ALL PRODUCT SPECIFICATION SERVICE FUNCTION. Caused by ${error}`;
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.error(`${msg}. Stack error type : ${error.stack}`);

        return await requestResult(code, msg);
    }
};
