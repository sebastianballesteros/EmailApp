const keys = require("../config/keys.js");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

//we didnt invoke requireLogin immediately, express will take care of it
module.exports = app => {
  app.post("/api/stripe", requireLogin, async (req,res) => {
    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      description: "$5 dollars for 5 credits",
      source: req.body.id
    });

    //thanks to passport
    req.user.credits += 5;
    const user = await req.user.save();
    res.send(user);
  });
};
