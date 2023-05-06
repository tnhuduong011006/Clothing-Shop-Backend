const config = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        uri: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/gumac_shop"
        }

};

module.exports = config