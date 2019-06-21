module.exports = {


    facebook: {
        clientID: process.env.facebookClientID,
        clientSecret: process.env.facebookClientSecret,
    },

    google: {
        clientID: process.env.googleClientID,
        clientSecret: process.env.googleClientSecret,
    },
    aws: {
        accessKeyId: process.env.awsaccessKeyId,
        secretAccessKey: process.env.awssecretAccessKey,
        region: process.env.awsregion
    },

    mongoURI: process.env.MONGO_URI,

    /*
    //dev
    facebook: {
        clientID: '234179700844362',
        clientSecret: '5397948f6399696f798ad898c0ab1857',
    },

    google: {
        clientID: '338396516084-24bdcnjo4sm2hgiu8t3rqs7oj4js13q0.apps.googleusercontent.com',
        clientSecret: 'qf8boUvVE9ZaayWsM6bxCEdi',
    },
    aws: {
        accessKeyId: 'AKIA4DUGOMQDA3M6ANHP',
        secretAccessKey: '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',
        region: 'us-east-2'
    },

    */


};