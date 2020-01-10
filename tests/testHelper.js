const mongoose = require("mongoose");
const config = require("config");

const testHelper = {
    initDBConnection: dbName => {
        mongoose.connect(`${config.get("db.url")}/${dbName}`, {
            useNewUrlParser: true,
            useCreateIndex: true
        });
    },
    finishDBConnection: async () => {
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            const collection = mongoose.connection.collections[collectionName];
            await collection.deleteMany();
        }
        return mongoose.disconnect();
    }
};

module.exports = testHelper;