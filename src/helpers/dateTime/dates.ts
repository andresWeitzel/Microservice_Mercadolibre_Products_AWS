/**
 * @description gets the current date in YYYY-MM-DD HH:MM:SS format
 * @returns a string with the indicated date format
 * @example {'2023-03-18 21:06:15'}
 */
export const currentDateTime = async () => {
    try {
        let date = new Date();
        let dateNow = (date.getFullYear() + "-" +
            ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
            ("00" + date.getDate()).slice(-2) + " " +
            ("00" + date.getHours()).slice(-2) + ":" +
            ("00" + date.getMinutes()).slice(-2) + ":" +
            ("00" + date.getSeconds()).slice(-2));
        return dateNow;
    } catch (error) {
        console.error(`ERROR in function currentDateTime(). Caused by ${error} . Specific stack is ${error.stack} `);
    }

}