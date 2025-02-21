const User = require("../models/user.js");


   module.exports.renderSignupForm =  (req,res) => {
    res.render("signup.ejs");
   }

   module.exports.signup = async (req,res) => {
   try{
       let {username, email, password} = req.body;
       const newUser = new User({username, email});
       await User.register(newUser,password);
       req.login(newUser, (err) => {
           if(err){
              return next(err);
           }
           else{
               req.flash("success", "Welcome to WanderLust");
               res.redirect("/listings");
           }
       })
     
   }
   catch(e){
       req.flash("errorr", e.message);
       res.redirect("/signup");
   }
   }

   module.exports.renderLoginForm = (req,res) => {
    res.render("login.ejs");
   }

   module.exports.login = async (req,res) => {
    req.flash("success", "Welcome back to WanderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}


   module.exports.logout = (req,res,next)=> {
    req.logout((err) => {
        if(err){
           return next(err);
        }
        else{
            req.flash("success", "You have been logged out");
            res.redirect("/listings");
        }
    })
    }