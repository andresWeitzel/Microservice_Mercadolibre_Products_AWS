
//Models
import { Product } from "src/models/Product";
import { ProductSequelize } from "src/models/ProductSequelize";
//Enums
import { statusName } from "src/enums/connection/statusName";
//Const/Vars
let product;
let msg;


/**
 * @description add product to database
 * @param {Object} inputProduct Object type
 * @returns a json object with the transaction performed
 */
export const addProduct = async function (inputProduct: Product) {
    try {
        product = null;
        msg = null;

        if (Product != null) {
            await ProductSequelize.create(
                {
                    site_id: inputProduct.getSiteId(),
                    title: inputProduct.getTitle(),
                    subtitle: inputProduct.getSubtitle(),
                    seller_id: inputProduct.getSellerId(),
                    category_id: inputProduct.getCategoryId(),
                    official_store_id: inputProduct.getOfficialStoreId(),
                    price: inputProduct.getPrice(),
                    base_price: inputProduct.getBasePrice(),
                    original_price: inputProduct.getBasePrice(),
                    initial_quantity: inputProduct.getInitialQuantity(),
                    available_quantity: inputProduct.getInitialQuantity(),
                    creation_date: inputProduct.getCreationDate(),
                    update_date: inputProduct.getUpdateDate()
                },
            )
                .then(productItem => {
                    product = productItem;
                })
                .catch(error => {
                    msg = `Error in create product model. Caused by ${error}`;
                    console.error(`${msg}. Stack error type : ${error.stack}`);
                    product = statusName.CONNECTION_REFUSED;
                })
        } else {
            product = statusName.CONNECTION_REFUSED;
        }

        return product;
    } catch (error) {
        msg = `Error in addProduct function. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        product = statusName.CONNECTION_ERROR;
    }
}

