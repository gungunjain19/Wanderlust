const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { reviewSchema, listingSchema} = require("./schema.js");
const ExpressError = require("./utils/expressError.js");

module.exports.isLoggedin = (req,res,next) => {
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("errorr", "You must be logged in to create new listing.");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
      res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner =  async (req,res,next) => {
let {id} = req.params;
let listing = await Listing.findById(id);
if(! listing.owner._id.equals(res.locals.currUser._id)){
    req.flash("errorr", "You are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
}
next();
}

module.exports.isAuthor =  async (req,res,next) => {
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("errorr", "You are not the author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
    }

    module.exports.validateReview = (res,req,next) => {
        let {error} = reviewSchema.validate(req.body);
       
        if(error){
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400,errMsg);
        }
        else{
            next();
        } 
    }

    module.exports.validateListing = (res,req,next) => {
        let {error} = listingSchema.validate(req.body);
       
        if(error){
            let errMsg = error.details.map((el) => el.message).join(",");
            throw new ExpressError(400,errMsg);
        }
        else{
            next();
        }
    }