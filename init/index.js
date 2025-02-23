const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then((res)=>{
    console.log("connection to DB succesfull");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

//deleting already existing data
//adding our new sampledata
const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data =   initData.data.map((obj) => ({...obj, owner : "6795f17111a6c1bb517935d6",}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();