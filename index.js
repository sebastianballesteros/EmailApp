//common JS modules
//import express library
const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User.js");
require("./services/passport.js");

//connnect to mongoDB from mLab
mongoose.connect(keys.mongoURI);

//is used to set up configuration and listen upcoming requests and send them to handlers
const app = express();

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
//environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);
