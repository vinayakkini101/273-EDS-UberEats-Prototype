var aws = require('aws-sdk');
var credentials = new aws.SharedIniFileCredentials();
aws.config.credentials = credentials;

let s3 = new aws.S3({apiVersion: '2006-03-01'});
// s3.listBuckets((err, data) => {
//     if(err)
//         console.log(err);
//     else
//         console.log('Success ', data);
// })

// s3.listObjects({Bucket: 'ubereats-app'}, (err, data) => {
//     if(err)
//         console.log(err);
//     else
//         console.log('list objects ', data);
// })

module.exports = s3;