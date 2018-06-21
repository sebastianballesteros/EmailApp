//common JS modules
//import express library
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User.js");
require("./services/passport.js");


//connnect to mongoDB from mLab
mongoose.connect(keys.mongoURI);

//is used to set up configuration and listen upcoming requests and send them to handlers
const app = express();

//for post, put will parse the body and put it in the req body
app.use(bodyParser.json());

//enable cookies
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

//call the function exported from authRoutes
require("./routes/authRoutes.js")(app);
require("./routes/billingRoutes.js")(app);

//express handles the routes
if(process.env.NODE_ENV === "production"){
  //Express will serve up production assets (main.js and main.css)
  app.use(express.static("client/build"));
  //Express will serve up the index.html file
  //if it doesnt recognize the route
  const path = app.require("path");
  app.get("*", (req,res) => {
    //if we dont know the route just render index.html
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html" ));
  });
}

//environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
