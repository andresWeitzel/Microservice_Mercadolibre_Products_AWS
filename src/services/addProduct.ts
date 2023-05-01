
//Models
import { Product } from "src/models/ProductSequelize";
//Enums
const {statusName} = require('../../enums/connection/statusName');
//Helpers
const { currentDateTime } = require('../../helpers/dates/date');
//Const/Vars
let product;
let msg;
let dateNow;


/**
 * @description add product to database
 * @param {Object} inputProduct Object type
 * @returns a json object with the transaction performed
 * @example
 * 
 */
export const addProduct = async function (inputProduct:object) {
    try {
        product = null;
        msg = null;
        dateNow = await currentDateTime();

        if (Product != null) {
        await Product.create(
            {
                nickname: nickname,
                first_name: firstName,
                last_name: lastName,
                email: email,
                identification_type: identificationType,
                identification_number: identificationNumber,
                country_id: countryId,
                creation_date: dateNow,
                update_date: dateNow,
            },
        )
            .then(productItem => {
                product = productItem;
            })
            .catch(error => {
                msg = `Error in create product model. Caused by ${error}`;
                console.error(`${msg}. Stack error type : ${error.stack}`);
            })
        } else {
            product = statusName.CONNECTION_REFUSED;
          }
    } catch (error) {
        msg = `Error in addproduct function. Caused by ${error}`;
        console.error(`${msg}. Stack error type : ${error.stack}`);
        product = statusName.CONNECTION_ERROR;
    }
    console.log(product);
    return product;

}

