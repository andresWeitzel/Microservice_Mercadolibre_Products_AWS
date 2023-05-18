//Externals
import { Sequelize } from "sequelize";
//Models
import { Product } from "src/models/Products/Product";
import { ProductSequelize } from "src/models/Sequelize/ProductSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
//Const/Vars
let product: any;
let msg: string;

/**
 * @description Get all paged products with all the attributes from the database according to the id passed as a parameter
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} orderBy Array Object type
 * @returns a list of paginated products
 */
export const getAll = async function (pageSizeNro: number, pageNro: number, orderBy: any) {
    try {
        //Init
        product = null;

        if (Product != null) {
            await ProductSequelize.findAll({
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
                limit: pageSizeNro,
                offset: pageNro,
                order: orderBy,
            })
                .then((findProduct) => {
                    product = findProduct;
                })
                .catch((error) => {
                    msg = `Error in get all paginated products. Caused by ${error}`;
                    console.error(`${msg}. Stack error type : ${error.stack}`);
                    product = statusName.CONNECTION_REFUSED;
                });
        } else {
            product = statusName.CONNECTION_REFUSED;
        }
        return product;
    } catch (error) {
        msg = `Error in getAll function. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        product = statusName.CONNECTION_ERROR;
    }
};
