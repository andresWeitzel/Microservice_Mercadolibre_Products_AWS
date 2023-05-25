//Models
import { ProductSpecification } from "src/models/Products/ProductSpecification";
import { ProductSpecifSequelize } from "src/models/Sequelize/ProductSpecifSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
//Helpers
import { getDateFormat } from "src/helpers/sequelize/dateFormat";
//Const/Vars
let product: any;
let msg: string;

/**
 * @description Get all paged products specification with all the attributes from the database according to the id passed as a parameter
 * @param {Number} pageSizeNro Number type
 * @param {Number} pageNro Number type
 * @param {Object} orderBy Array Object type
 * @returns a list of paginated products
 */
export const getAllProductSpecifRepository = async function (pageSizeNro: number, pageNro: number, orderBy: any) {
    try {
        //Init
        product = null;
        msg = null;

        if (ProductSpecification != null) {
            await ProductSpecifSequelize.findAll({
                attributes: {
                    include: [
                        await getDateFormat("stop_time"),
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
                    msg = `Error in GET ALL PRODUCT SPECIFICATION REPOSITORY FUNCTION. Caused by ${error}`;
                    console.error(`${msg}. Stack error type : ${error.stack}`);
                    product = statusName.CONNECTION_REFUSED;
                });
        } else {
            product = statusName.CONNECTION_REFUSED;
        }
        return product;
    } catch (error) {
        msg = `Error in GET ALL PRODUCT SPECIFICATION REPOSITORY FUNCTION. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        product = statusName.CONNECTION_ERROR;
    }
};
