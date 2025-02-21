const mongoose = require('mongoose');
const schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");


//passport local mongoose automatically add a username, hash and salt to store username and the hashed password
const userSchema = new schema({
    email : {
        type : String,
        required : true
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);