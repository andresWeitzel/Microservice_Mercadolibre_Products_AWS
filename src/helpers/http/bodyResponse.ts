/**
 * @description get a json with the http status code, a message and input
 * @param {Number} statusCode Number type
 * @param {String} message String type
 * @returns a json for the lambda response
 */
export const requestResult = async (statusCode:number, message:string) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(
            {
                message: message,
            },
            null,
            2
        ),
    };
}