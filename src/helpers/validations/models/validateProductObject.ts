//External
import {
  validate
} from 'class-validator';
//Models 
import { Product } from 'src/models/Product';
//Const/vars
let validateCheck;


/**
 * @description Validation of all the properties of the Product class.
 * @param {object} objProduct object type
 * @returns a boolean
 */
export const validateProductObject = async (objProduct: Product) => {
  validateCheck = false;

  try {

    validateCheck = await validate(objProduct);
    console.log({ 'VALIDATE': validateCheck });

    if (validateCheck.length > 0) {
      console.log(validateCheck.VALIDATE.ValidationError2.constraints);
    }

    return validateCheck;

  } catch (error) {
    console.error(`ERROR in function validateProductObject(). Caused by ${error} . Specific stack is ${error.stack} `);
  }

}