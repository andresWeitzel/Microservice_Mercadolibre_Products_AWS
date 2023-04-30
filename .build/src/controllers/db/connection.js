var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { dbConnection } = require('../../db/config');
const { statusCode } = require('../../enums/http/statusCode');
const { requestResult } = require('../../helpers/http/bodyResponse');
let msg;
let code;
module.exports.handler = (event) => __awaiter(this, void 0, void 0, function* () {
    try {
        msg = null;
        code = null;
        yield dbConnection.authenticate()
            .then(() => {
            msg = 'Connection has been established successfully.';
            code = statusCode.OK;
            console.log(msg);
        }).catch((error) => {
            msg = 'Unable to connect to the database: ', JSON.stringify(error);
            code = statusCode.INTERNAL_SERVER_ERROR;
            console.log(error);
        });
        return yield requestResult(code, msg, event);
    }
    catch (error) {
        console.error(`Error in db connection lambda, caused by ${error}. Stack error type : ${error.stack}`);
    }
});
//# sourceMappingURL=connection.js.map