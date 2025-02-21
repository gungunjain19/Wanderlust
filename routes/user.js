const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

//SIGNUP get and post

router.get("/signup", userController.renderSignupForm);

router.post("/signup", wrapAsync( userController.signup));

//LOGIN get and post

router.get("/login", userController.renderLoginForm);
   
   //passport.authenticate act as a middleware that perform all functions for authentication and then pass the command to our call back fn
router.post('/login', saveRedirectUrl, passport.authenticate('local', { failureFlash : true , failureRedirect: '/login'  }),
 wrapAsync( userController.login));

//LOGOUT ROUTE

router.get('/logout', userController.logout);
module.exports = router;