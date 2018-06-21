const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
const keys = require("../config/keys.js");

//trying to fetch out of mongoose
const User = mongoose.model("users");

//serialize an user
passport.serializeUser( ( user, done ) => {
  done(null, user.id);
});

//deserialize an user
passport.deserializeUser( (userID, done ) => {
  //returns a promise
  User.findById(userID).
  then( user => done(null, user) );
});

//passport usage
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
  }, async (accessToken, refreshToken, profile, done) => {
        //returns a promise
        const existingUser = await User.findOne({ googleID: profile.id })
        if (existingUser) {
          //we already have a record
          done(null, existingUser);
        }
        else {
          //make a new record
          const user = await new User({ googleID: profile.id, name: profile.displayName }).save()
          done(null, user);
        }
    })
);
