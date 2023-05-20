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
      'Bad request, check request attributes. Validate the following : product id value must be less than 9007199254740990,product id value must be greater than zero,The product id must be of type integer,The product id cannot be empty,The value of the specification Uuid must be between 2 and 36 characters,The specification Uuid must be of type string,The specification Uuid cannot be empty'
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