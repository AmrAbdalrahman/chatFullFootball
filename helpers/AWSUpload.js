const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const secret = require('../secret/secretFile');


AWS.config = new AWS.Config({
    accessKeyId: secret.aws.accessKeyId,
    secretAccessKey: secret.aws.secretAccessKey,
    region: secret.aws.region
});


const s0 = new AWS.S3({});


const upload = multer({
    storage: multerS3({
        s3: s0,
        bucket: 'fotballkik',
        acl: 'public-read',
        metadata: function(req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
    rename: function(fieldName, fileName) {
        return fileName.replace(/\W+/g, '-');
    },


});

exports.Upload = upload;