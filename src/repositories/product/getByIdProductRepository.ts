//Models
import { Product } from "src/models/Products/Product";
import { ProductSequelize } from "src/models/Sequelize/ProductSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
//Helpers
import { getDateFormat } from "src/helpers/sequelize/dateFormat";
//Const/Vars
let product: any;
let msg: string

/**
 * @description Get a product with all the attributes from the database according to the id passed as a parameter
 * @param {Number} id Number type
 * @returns a Product according to his id
 * @example
 */
export const getByIdProductRepository = async function (id: number) {
  try {
    product = null;
    msg = null;

    if (Product != null) {
      await ProductSequelize.findByPk(id
        , {
          attributes: {
            include: [
              await getDateFormat("creation_date"),
              await getDateFormat("update_date")
            ],
          },
        }
      )
        .then((findProduct) => {
          product = findProduct;
        })
        .catch((error) => {
          msg = `Error in GET BY ID PRODUCT REPOSITORY function. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          product = statusName.CONNECTION_REFUSED;
        });
    } else {
      product = statusName.CONNECTION_REFUSED;
    }

    return product;
  } catch (error) {
    msg = `Error in GET BY ID PRODUCT REPOSITORY function. Caused by ${error}`;
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
export const getByIdProductRepositoryWithoutDate = async function (id: number) {
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
          msg = `Error in GET BY ID PRODUCT WITHOUT DATE  REPOSITORY function. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          product = statusName.CONNECTION_REFUSED;
        });
    } else {
      product = statusName.CONNECTION_REFUSED;
    }

    return product;
  } catch (error) {
    msg = `Error in GET BY ID PRODUCT WITHOUT DATE REPOSITORY function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};
