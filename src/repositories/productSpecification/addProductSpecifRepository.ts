
//Models
import { ProductSpecifSequelize } from "src/models/Sequelize/ProductSpecifSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
import { ProductSpecification } from "src/models/Products/ProductSpecification";
//Const/Vars
let productSpecification:any;
let msg:string;


/**
 * @description add product to database
 * @param {Object} inputProduct Object type
 * @returns a json object with the transaction performed
 */
export const addProductSpecifRepository = async function (inputProduct: ProductSpecification) {
    try {
        productSpecification = null;
        msg = null;

        if (ProductSpecification != null) {
            await ProductSpecifSequelize.create(
                {
                    product_id: inputProduct.getproductId(),
                    specification_uuid: inputProduct.getspecificationUuid(),
                    stop_time : inputProduct.getStopTime(),
                    creation_date: inputProduct.getCreationDate(),
                    update_date: inputProduct.getUpdateDate()
                },
            )
                .then(productItem => {
                    productSpecification = productItem;
                })
                .catch(error => {
                    msg = `Error ADD PRODUCT SPECIFICATION REPOSITORY. Caused by ${error}`;
                    console.error(`${msg}. Stack error type : ${error.stack}`);
                    productSpecification = statusName.CONNECTION_REFUSED;
                })
        } else {
            productSpecification = statusName.CONNECTION_REFUSED;
        }

        return productSpecification;
    } catch (error) {
        msg = `Error in ADD PRODUCT SPECIFICATION REPOSITORY function. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        productSpecification = statusName.CONNECTION_ERROR;
    }
}

