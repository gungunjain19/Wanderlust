require('dotenv').config();
// console.log(process.env.SECRET);
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3004;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
//using multer package to read file data (image upload)

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);

//app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"public")));

main().then((res)=>{
    console.log("connection to DB succesfull");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sessionOptions = {
    secret :process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 1000 * 60 * 60 * 24 * 3,
        maxAge : 1000 * 60 * 60 * 24 * 3,
        httpOnly : true
    }
};
app.use(session(sessionOptions));
app.use(flash());

//using passport for authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
res.locals.success = req.flash("success");
res.locals.errorr = req.flash("errorr");
res.locals.currUser = req.user;
next();
});


// to check the route
// app.get("/",(req,res)=>{
//     res.send("route is working");
// }); 

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);


app.all( "*", (req,res,next) => {
    next(new ExpressError(404,"Page Not Found!"));
});

//handling custom error 
app.use((err ,req ,res ,next ) => {
    let {statusCode = 500, message = "something went wrong"} = err;
    //res.status(statusCode).send(message);
   // res.render("error.ejs",{message});
   res.status(statusCode).render("error.ejs",{message});
});

app.listen(port,()=>{
    console.log("app is listening");
});