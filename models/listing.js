// LISTING WILL INCLUDE : TITLE, DESCRIPTION, IMAGE, PRICE, LOCATION, COUNTRY

const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require('./review.js');
const User = require('./user.js');

const listingSchema = new schema({
   title : {
    type : String
   },
    description : {
    type : String,
    required : true
   },
   image : {
    type : String,
    set : (v) => v===""?
     "https://plus.unsplash.com/premium_photo-1661962660197-6c2430fb49a6?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      :v,
     },
   price : {
    type : Number
   },
   location : {
    type : String
   },
   country : {
    type : String
   },
   reviews : [{
      type : schema.Types.ObjectId,
      ref : "Review"
   }],
   owner : {
      type : schema.Types.ObjectId,
      ref : "User"
   },
   geometry : {
      type: {
        type: String, 
        enum: ['Point'], 
        required:true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    }
});
// handling deleting posts
//delete all the reviews associated with that post
listingSchema.post("findOneAndDelete", async (listing) => {
   if(listing){
      await Review.deleteMany({_id : {$in : listing.reviews} });
   }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;