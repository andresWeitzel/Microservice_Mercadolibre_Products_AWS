
//Models
import { ProductSpecificationSequelize } from "src/models/Sequelize/ProductSpecification";
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
export const addProductSpecification = async function (inputProduct: ProductSpecification) {
    try {
        productSpecification = null;
        msg = null;

        if (ProductSpecification != null) {
            await ProductSpecificationSequelize.create(
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
                    msg = `Error in create product specification sequelize model. Caused by ${error}`;
                    console.error(`${msg}. Stack error type : ${error.stack}`);
                    productSpecification = statusName.CONNECTION_REFUSED;
                })
        } else {
            productSpecification = statusName.CONNECTION_REFUSED;
        }

        return productSpecification;
    } catch (error) {
        msg = `Error in addProductSpecification function. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        productSpecification = statusName.CONNECTION_ERROR;
    }
}

