const express = require("express");
const router = express.Router({mergeParams : true});

const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listing.js");


//passing validateListing as middleware

//1. INDEX ROUTE     GET request at "/listings"

router.get("/", wrapAsync (listingController.index));

//2. Creating a new route  at GET /listings/new

router.get("/new", isLoggedin, listingController.renderNewForm); 

router.post("/",validateListing, isLoggedin, wrapAsync (listingController.newListing));

//3. Show route  GET at /listings/:id  

router.get("/:id", wrapAsync (listingController.showListing));

//4. Edit route and update route

router.get("/:id/edit", isLoggedin, isOwner, wrapAsync (listingController.renderEditForm));

router.put("/:id", isLoggedin, isOwner, validateListing, wrapAsync (listingController.updateListing));

//delete route

router.delete("/:id", isLoggedin,isOwner, wrapAsync (listingController.destroyListing));

module.exports = router;
