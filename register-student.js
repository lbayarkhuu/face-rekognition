const AWS = require("aws-sdk")

var rekognition = new AWS.Rekognition();

exports.handler = async (event) => {
    console.log(JSON.stringify(event))
    
    const key = event.Records[0].s3.object.key
    const bucket = event.Records[0].s3.bucket.name
    const externalImageId = key.split("/").slice(-1)[0]
    
    var params = {
            CollectionId: "faceapp3", 
            DetectionAttributes: [
            ], 
            ExternalImageId: externalImageId, 
            Image: {
                S3Object: {
                    Bucket: bucket, 
                    Name: key
                }
            }
        };
        
    const res = await rekognition.indexFaces(params).promise();
    
    console.log(JSON.stringify(res))
    
    return null;
};
