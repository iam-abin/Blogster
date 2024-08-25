const keys = require("../keys");

const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(keys.mongoURI);
        console.log("Connected to Mongodb....");
    } catch (error) {
        console.log(error);
        throw new Error("Mongodb connection failed!!!");
    }
};

module.exports = { connectDB };
