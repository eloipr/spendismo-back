const mongoose = require("mongoose");
const config = require("config");

mongoose.connect(`${config.get("db.url")}/${config.get("db.name")}`, {
    useNewUrlParser: true,
    useCreateIndex: true
});
