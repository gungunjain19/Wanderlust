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
    default : "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60"
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