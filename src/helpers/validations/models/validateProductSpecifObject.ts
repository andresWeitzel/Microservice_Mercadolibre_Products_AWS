//External
import {
    validate
  } from 'class-validator';
 //Models 
import { ProductSpecification } from 'src/models/Products/ProductSpecification';
  //Const/vars
  let stackFieldsErrors;
  
  
  /**
   * @description Validation of all the properties of the ProductSpecification class.
   * @param {object} objProductSpecification object type
   * @returns an array object with the specific errors (constraints) of each class property
   * @example  [
      'The value of the site id must be between 2 and 20 characters',
      'The site id cannot be empty',
      'The value of the title must be between 2 and 100 characters',
      'The title cannot be empty'
    ]
   */
  export const validateProductSpecificationObject = async (objProductSpecification: ProductSpecification) => {
    stackFieldsErrors = [];
  
    try {
  
      await validate(objProductSpecification).then((errors) => {
        errors.map((e) => {
          for (let key in e.constraints) {
            stackFieldsErrors.push(e.constraints[key]);
          }
        })
      });
  
      return stackFieldsErrors;
  
    } catch (error) {
      console.error(`ERROR in function validateProductSpecificationObject(). Caused by ${error} . Specific stack is ${error.stack} `);
    }
  
  }