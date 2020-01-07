const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/spendismo", {
    useNewUrlParser: true,
    useCreateIndex: true
});
