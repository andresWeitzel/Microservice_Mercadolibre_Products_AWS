//External
import axios from 'axios';
//Const-vars
let addedProductSpecificationObject;

/**
 * @description send a request and get an object to the database
 * @returns the added object in the database
 * @example {
            "id": null,
            "product_id": 31,
            "specification_uuid": "ff5caf5b-ee93-4e77-9347-cec3b3f087fa",
            "stop_time": "2045-02-10 10:15",
            "creation_date": "2023-05-21 17:06:03",
            "update_date": "2023-05-21 17:06:03"
        }
 */
export const getAddedProductSpecificationObject = async (url: string, body: any, headers: any) => {
    try {
        addedProductSpecificationObject = null;
        addedProductSpecificationObject = await axios.post(url, body, headers).then(addedProductSpecificationObject => addedProductSpecificationObject)
            .catch((error) => {
                console.log(error);
                return error;
            });

        return addedProductSpecificationObject;

    } catch (error) {
        console.error(`ERROR in function getAddedProductSpecificationObject(). Caused by ${error} . Specific stack is ${error.stack} `);
    }
}