//Externals
import {
  Op
} from 'sequelize';
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
 * @description Get a product with all the attributes from the database according to the creation date and title passed as a parameter
 * @param {string} title string type
 * @param {string} creationDate string type
 * @returns a Product according to his title and creation date
 * @example
 */
export const getLikeCreationDateAndTitle = async function (title: string, creationDate:string) {
  try {
    product = null;
    msg = null;

    if (Product != null) {
      await ProductSequelize.findAll(
        {
          attributes: {
            include: [
              await getDateFormat("creation_date"),
              await getDateFormat("update_date")
            ],
          },
        where: {
          creation_date: {
              [Op.like]: `%${creationDate}%`
          },
          title: {
            [Op.like]: `%${title}%`
          }
      },
        limit: 1,
    },
      )
        .then((findProduct) => {
          product = findProduct;
        })
        .catch((error) => {
          msg = `Error in get getLikeCreationDateAndTitle product according to your title and creation_date. Caused by ${error}`;
          console.error(`${msg}. Stack error type : ${error.stack}`);
          product = statusName.CONNECTION_REFUSED;
        });
    } else {
      product = statusName.CONNECTION_REFUSED;
    }

    return product;
  } catch (error) {
    msg = `Error in getLikeCreationDateAndTitle function. Caused by ${error}`;
    console.error(`${msg}. Stack error type : ${error.stack}`);
    product = statusName.CONNECTION_ERROR;
  }
};

