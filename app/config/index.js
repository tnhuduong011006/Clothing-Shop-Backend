const config = {
    app: {
        port: process.env.PORT || 3000,
    },

    db: {
        uri: process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/cosmestic_shop"
        }

};

module.exports = config