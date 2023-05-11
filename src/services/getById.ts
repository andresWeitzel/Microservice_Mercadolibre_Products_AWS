//Externals
//const { Sequelize } = require("sequelize");
import {Sequelize} from "sequelize";
//Models
import { Product } from "src/models/Product";
import { ProductSequelize } from "src/models/ProductSequelize";
//Const/Vars
let product;

/**
 * @description Get a product with all the attributes from the database according to the id passed as a parameter
 * @param {Number} id Number type
 * @returns a Product according to his id
 * @example
 */
export const getById = async function (id:number) {
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
          console.log(error);
        });
    } else {
      product = "ECONNREFUSED";
    }
    
  return product;
  } catch (error) {
    console.log(error);
    product = "ERROR";
  }
};

// /**
//  * @description gets a Product with id, nickname, email, identification and country attributes whose id matches the one passed as a parameter
//  * @param {Number} id Number type
//  * @returns a Product according to his id
//  * @example
//  * {"id":2,"nickname":"JAVIER GONZALEZ","email":"javiBoquita@gmail.com","identification_type":"DNI","identification_number":"2672268765","country_id":"AR"}
//  */
// const getByIdLimit = async function (id) {
//   try {
//     Product = null;
//     checkDbConn = await checkDbAuthentication();

//     if (checkDbConn && Product != null) {
//       await Product.findByPk(id, {
//         attributes: {
//           exclude: ["first_name", "last_name", "creation_date", "update_date"],
//         },
//       })
//         .then((findProduct) => {
//           Product = findProduct;
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     } else {
//       Product = "ECONNREFUSED";
//     }
//   } catch (error) {
//     console.log(error);
//     Product = "ERROR";
//   }
//   console.log(Product);
//   return Product;
// };
