const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.URL;

const connect = () => {
    mongoose.set("strictQuery", false);
    return mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = connect;