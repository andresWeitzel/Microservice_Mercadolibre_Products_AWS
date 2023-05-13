"use strict";

//External
const {
    S3Client
} = require("@aws-sdk/client-s3");


/**
 * @description define the credentials and endpoint for a new s3 client
 * @param {Object} event Object type
 */
const newClientS3 = async () => {
    try {
        const client = new S3Client({
            forcePathStyle: true,
            credentials: {
                accessKeyId: process.env.S3_CLIENT_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_CLIENT_SECRET_ACCESS_KEY,
            },
            endpoint: process.env.S3_CLIENT_ENDPOINT,
        });

       return client;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    newClientS3
};