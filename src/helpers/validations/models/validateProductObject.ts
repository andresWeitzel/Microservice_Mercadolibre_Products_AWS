
//External
import {
    IsNotEmpty,
    IsString,
    Length
  } from 'class-validator';
  
  
  //Const/vars
  let validateCheck;
  let validatorObj;
  let eventBodyObj;
  /**
   * @description To validate the request body parameters to add a product to the database.
   * @param {object} eventBody event.body type
   * @returns a boolean
   */
  export const validateProductObject = async (eventBody:any) => {
    eventBodyObj = null;
    validatorObj= null;
    validateCheck = false;
    
    try{
      if(eventBody!=null){
  
      }
  
    } catch (error) {
      console.log(error);
    }
  
    return validateCheck;
  }