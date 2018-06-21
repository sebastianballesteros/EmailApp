const passport = require("passport");

//export as a function
module.exports = app => {
  //authenticate in google and receive code
  app.get("/auth/google", passport.authenticate("google", {
    //asking google what do we want
    scope: ["profile", "email"],
    prompt: 'select_account'
    })
  );

  //using the code for information about the user
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) =>  {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req,res) => {
    //logout is attached to the req object by passport
    //it kills the cookie that has the info
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req,res) => {
    res.send(req.user);
  })
};
