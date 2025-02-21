const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = "pk.eyJ1IjoiZ3VuZ3VuamFpbjE5IiwiYSI6ImNtNmY1Z2s0bTAxdmwyanNpdncxbHVud3cifQ.WK8KJigVDlA-8QajvVA7yQ";
const geocodingClient = mbxGeocoding({accessToken : mapToken});

module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs",{allListings});
}

module.exports.renderNewForm = (req,res) => {
   res.render("new.ejs");
}

module.exports.newListing = async (req,res,next) => {

//    let response = await geocodingClient.forwardGeocode({
//         query: req.body.listing.location,
//         limit: 2
//       }).send();

let listing = req.body.listing;
const newListing = new Listing(listing);
newListing.owner = req.user._id;
// newListing.geometry = response.body.features[0].geometry;
await newListing.save();
req.flash("success", "New Listing Created");
res.redirect("/listings");
}

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
   const listing = await Listing.findById(id).populate({path : "reviews",
     populate :{path : "author"},}).populate("owner");

   if(!listing){
    req.flash("errorr", "Listing you requested for doesn't exist");
    res.redirect("/listings");
   }
   res.render("show.ejs", {listing});
}

module.exports.renderEditForm = async (req,res) => {
    let {id} = req.params;
const listing = await Listing.findById(id);
res.render("edit.ejs",{listing});
}

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash("success", "Listing Updated");
    res.redirect("/listings"); 
}

module.exports.destroyListing = async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
}
