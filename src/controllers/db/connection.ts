//dbConfig
const { dbConnection } = require('../../db/localConfig');
//Enums
const { statusCode } = require('../../enums/http/statusCode');
//Helpers
const { requestResult } = require('../../helpers/http/bodyResponse');

module.exports.handler = async (event) => {

  try {

    //-- start with db query  ---
    await dbConnection.authenticate()
      .then(() => {
        msg = 'Connection has been established successfully.';
        code = statusCode.OK;

        console.log(msg);

      }).catch((error) => {
        msg = 'Unable to connect to the database: ', JSON.stringify(error);
        code = statusCode.INTERNAL_SERVER_ERROR;
        console.log(error);

      });

    return await requestResult(code, msg, event);
    //-- end with db query  ---

  } catch (error) {
    console.log(error);
  }


};