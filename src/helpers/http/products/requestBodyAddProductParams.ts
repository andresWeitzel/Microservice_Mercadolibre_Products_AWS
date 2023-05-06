// //External Imports
// const { Validator } = require("node-input-validator");
// //Const/vars
// let validateCheck;
// let validatorObj;
// let eventBodyObj;
// /**
//  * @description To validate the request body parameters to add a product to the database.
//  * @param {object} eventBody event.body type
//  * @returns a boolean
//  */
// export const validateBodyAddProductParams = async (eventBody:any) => {
//   eventBodyObj = null;
//   validatorObj= null;
//   validateCheck = false;
  
//   try{
//     if(eventBody!=null){

//       eventBodyObj ={
//         data:{
//           siteId: await eventBody["site_id"],
//           title: await eventBody["title"],
//           subtitle: await eventBody["subtitle "],
//           sellerId: await eventBody["seller_id"],
//           categoryId: await eventBody["category_id"],
//           officialStoreId: await eventBody["official_store_id"],
//           price: await eventBody["price"],
//           basePrice: await eventBody["base_price"],
//           originalPrice: await eventBody["original_price"],
//           initialQuantity: await eventBody["initial_quantity"],
//           availableQuantity: await eventBody["available_quantity"],
//         }
//       }


//       validatorObj = new Validator(
//         {
//           eventBodyObj,
//         },
//         {
//           "eventBodyObj.data.siteId": "required|string|minLength:2|maxLength:20",
//           "eventBodyObj.data.title": "required|string|minLength:4|maxLength:100",
//           "eventBodyObj.data.subtitle": "required|string|minLength:4|maxLength:50",
//           "eventBodyObj.data.sellerId": "required|string|minLength:10|maxLength:100",
//           "eventBodyObj.data.categoryId": "required|string|minLength:2|maxLength:20",
//           "eventBodyObj.data.officialStoreId": "required|string|minLength:6|maxLength:20",
//           "eventBodyObj.data.price": "required|string|minLength:2|maxLength:5",
//           "eventBodyObj.data.originalPrice": "required|string|minLength:2|maxLength:5",
//           "eventBodyObj.data.initialQuantity": "required|string|minLength:2|maxLength:5",
//           "eventBodyObj.data.availableQuantity": "required|string|minLength:2|maxLength:5",
//         }
//       );
//       validateCheck = await validatorObj.check();

//     }

//   } catch (error) {
//     console.log(error);
//   }

//   return validateCheck;
// }
