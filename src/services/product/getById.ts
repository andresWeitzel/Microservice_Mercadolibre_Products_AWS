//Externals
import { Sequelize } from "sequelize";
//Models
import { Product } from "src/models/Products/Product";
import { ProductSequelize } from "src/models/Sequelize/ProductSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
//Const/Vars
let product: any;
let msg: string

/**
 * @description Get a product with all the attributes from the database according to the id passed as a parameter
 * @param {Number} id Number type
 * @returns a Product according to his id
 * @example
 */
export const getById = async function (id: number) {
  try {
    product = null;

    if (Product != null) {
      await ProductSequelize.findByPk(id
        , {
          attributes: {
            include: [
              [
                Sequelize.fn(
                  "DATE_FORMAT",
                  Sequelize.col("creation_date"),
                  "%Y-%m-%d %H:%i:%s"
                ),
                "creation_date",
              ],
              [
                Sequelize.fn(
                  "DATE_FORMAT",
                  Sequelize.col("update_date"),
                  "%Y-%m-%d %H:%i:%s"
                ),
                "update_date",
              ],
            ],
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
    msg = `Error in getById function. Caused by ${error}`;
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
export const getByIdWithoutDate = async function (id: number) {
  try {
    product = null;

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
    msg = `Error in getByIdWithoutDate function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};
