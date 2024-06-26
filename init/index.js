const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("connected successfully");
}

main().then(() => {
    initDb();
}).catch(err => {
    console.log(err);
});

const initDb = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};
