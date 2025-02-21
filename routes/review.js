const express = require("express");
const router = express.Router({ mergeParams : true});

const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedin, isAuthor, validateReview} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

 
//REVIEWS POST ROUTE

router.post("/",isLoggedin, validateReview, wrapAsync (reviewController.createReview));

//delete review route
//using mongoose pull operator - removes from an existing array all instances of the matching condition
router.delete("/:reviewId", isLoggedin, isAuthor, wrapAsync(reviewController.destroyReview));

module.exports = router;