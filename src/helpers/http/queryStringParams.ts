//Const/vars
let validate:boolean;

/**
 * @description validates the path parameters of the event object
 * @param {Object} object Object type
 * @returns a boolean
 */
export const validatePathParameters = async (object: any) => {
    try {
        validate = true;

        if (object == null
            || object == undefined
            || object.length < 0
            || object.length > 255
            || Object.keys(object).length === 0) {
            validate = false;
        }
        return validate;
    } catch (error) {
    console.error(`ERROR in function validatePathParameters (). Caused by ${error} . Specific stack is ${error.stack} `);
}

}