// Reviews model will include comment, rating from 1 to 5, createdAt date and time

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const User = require('./user.js');

const reviewSchema = new schema({
   comment : {
    type : String
   },
   rating : {
    type : Number,
    min : 1,
    max : 5
   },
    createdAt : {
    type : Date,
    default : Date.now()
   },
   author : {
      type : schema.Types.ObjectId,
      ref : "User"
   },
});

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;