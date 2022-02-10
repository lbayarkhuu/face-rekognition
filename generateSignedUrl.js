const AWS = require('aws-sdk')

AWS.config.update({ 
    region: 'us-east-1',
    signatureVersion: 'v4'
});

const s3 = new AWS.S3()
const myBucket = 'faceapp-feb9'
const myKeyPrefix = 'attendances/'
const signedUrlExpireSeconds = 60 * 5

exports.handler = async (event) => {
    const url = s3.getSignedUrl('putObject', {
        Bucket: myBucket,
        Key: myKeyPrefix + (new Date()).toISOString().substr(0, 10) + (new Date()).getTime().toString(36),
        Expires: signedUrlExpireSeconds
    });
    
    let response = {
        statusCode: 200,
        body: JSON.stringify({url})
    };
    
    return response;
};
