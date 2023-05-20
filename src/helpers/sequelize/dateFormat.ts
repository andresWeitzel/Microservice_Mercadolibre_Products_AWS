//Externals
import { Sequelize } from "sequelize";
//Const-vars
let dateFormat:any;

/**
 * @description get a json object with dates format YYYY-MM-DD hh:mm:ss with sequelize functions according to input field
 * @param {String} field String type
 * @returns a json with sequelize date format
 */
export const getDateFormat = async(field:string) => {
  try {
    dateFormat =  { include: [
      [
        Sequelize.fn(
          "DATE_FORMAT",
          Sequelize.col(field),
          "%Y-%m-%d %H:%i:%s"
        ),
        field,
      ]
    ]
  }
      return dateFormat.include[0];

  } catch (error) {
    console.log(`Error in getDateFormat(), caused by ${{ error }}`);
    console.error(error.stack);
    
  }
 
}

