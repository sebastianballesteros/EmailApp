const _ = require("lodash");
const Path = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../middlewares/requireLogin.js");
const requireCredits = require("../middlewares/requireCredits.js");
const mongoose = require("mongoose");
const Survey = mongoose.model("surveys");
const Mailer = require("../services/Mailer.js");
const surveyTemplate = require("../services/emailTemplates/surveyTemplate.js");

module.exports = app => {

  app.get("/api/surveys/", requireLogin, async (req,res) =>  {
    const surveys = await Survey.find({ _user: req.user.id })
      .select( {recipients:false} );

    res.send(surveys);
  });

  app.get("/api/:surveyId/:choice", (req,res) => {
    res.send("Thanks for voting!");
  });

  app.post("/api/surveys/webhooks", (req,res) => {

    const p = new Path("/api/surveys/:surveyId/:choice");

    _.chain(req.body)
    .map( (event)  => {
      //we extract the route from url
      const match = p.test(new URL(event.url).pathname);
      if (match){
        return {
          email: event.email,
          surveyId: match.surveyId,
          choice: match.choice };
      }
    })
    .compact()
    .uniqBy("email", "surveyId")
    .each( event => {
      Survey.updateOne({
        _id: event.surveyId,
        recipients:{
          $elemMatch: { email: event.email, responded: false
          }
        }
      }, {
        $inc: { [ event.choice ] : 1},
        $set: { "recipients.$.responded" :true},
        $lastResponded: new Date()
      }).exec();
    })
    .value();

    res.send({});
  });

  //requireLogin and requireCredits are middlewares to assure
  //you are logged you have credits
  app.post("/api/surveys", requireLogin, requireCredits, async (req,res) => {
    //since we are pulling everything that it is passed to the request body with JAVA ES6
    //this is what is returned from the form! so we have to make a new instance
    //of the survey in the database
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey ({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(",").map( (email) => { return { email: email.trim() }} ),
      //relationship field, id property is generated automatically by mongoDB
      _user: req.user.id,
      dateSent: Date.now()
    });
    //now that survey is created we want to send the email
    const mailer = new Mailer(survey, surveyTemplate(survey) );

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch(err){
      res.status(422).send(err);
    }
  });
};
