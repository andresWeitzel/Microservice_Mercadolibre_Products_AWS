//Models
import { Product } from "src/models/Products/Product";
import { ProductSequelize } from "src/models/Sequelize/ProductSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
//Helpers
import { getDateFormat } from "src/helpers/sequelize/dateFormat";
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
export const getAllProductRepository = async function (pageSizeNro: number, pageNro: number, orderBy: any) {
    try {
        //Init
        product = null;
        msg = null;

        if (Product != null) {
            await ProductSequelize.findAll({
                attributes: {
                    include: [
                        await getDateFormat("creation_date"),
                        await getDateFormat("update_date")
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
                    msg = `Error in GET ALL PRODUCT REPOSITORY FUNCTION. Caused by ${error}`;
                    console.error(`${msg}. Stack error type : ${error.stack}`);
                    product = statusName.CONNECTION_REFUSED;
                });
        } else {
            product = statusName.CONNECTION_REFUSED;
        }
        return product;
    } catch (error) {
        msg = `Error in GET ALL PRODUCT REPOSITORY FUNCTION. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        product = statusName.CONNECTION_ERROR;
    }
};
