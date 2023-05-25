//Models
import { Product } from "src/models/Products/Product";
import { ProductSequelize } from "src/models/Sequelize/ProductSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
//Helpers
import { getDateFormat } from "src/helpers/sequelize/dateFormat";
import { validatePathParameters } from "src/helpers/http/queryStringParams";
import { requestResult } from "src/helpers/http/bodyResponse";
//Const/Vars
let product: any;
let msg: string;
let validatePathParams:boolean;

/**
 * @description Get a product with all the attributes from the database according to the id passed as a parameter
 * @param {Number} inputProductId Number type
 * @returns a Product according to his id
 * @example
 */
export const getByIdProductService = async function (inputProductId: number) {
  try {
     //-- start with path parameters  ---

     validatePathParams = await validatePathParameters(inputProductId);

     if (!validatePathParams) { 
         return await requestResult(
             statusCode.BAD_REQUEST,
             "Bad request, the id passed as a parameter is not valid"
         );
     }
     //-- end with path parameters  ---

     //-- start with db query  ---
     product = await getById(productId);
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

    return product;
  } catch (error) {
    msg = `Error in getByIdProductService function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};


/**
 * @description Get a product with all the attributes without date from the database according to the id passed as a parameter
 * @param {Number} id Number type
 * @returns a Product according to his id
 * @example
 */
export const getByIdProductServiceWithoutDate = async function (id: number) {
  try {
    product = null;
    msg = null;

    if (Product != null) {
      await ProductSequelize.findByPk(id
        , {
          attributes: {
            exclude: ["creation_date", "update_date"],
          },
        }
      )
        .then((findProduct) => {
          product = findProduct;
        })
        .catch((error) => {
          msg = `Error in get product according to your id. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          product = statusName.CONNECTION_REFUSED;
        });
    } else {
      product = statusName.CONNECTION_REFUSED;
    }

    return product;
  } catch (error) {
    msg = `Error in getByIdProductServiceWithoutDate function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};
