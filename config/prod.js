//production keys
module.exports = {
  googleClientID : process.env.GOOGLE_CLIENT_ID, //'39387911812-tgrhblchfmbo33k6ideaa4kbcoe8ch27.apps.googleusercontent.com',
  googleClientSecret : process.env.GOOGLE_CLIENT_SECRET, //'FPs0RjkiE6XfSuk5A1h5zNSW',
  mongoURI: process.env.MONGO_URI, //"mongodb://tatanballesteros:tatan22@ds261440.mlab.com:61440/emaily-prod22",
  cookieKey: process.env.COOKIE_KEY, //"sebastianballesteros22"
  stripeKey: process.env.STRIPE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY, // "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"
  redirectDomain: process.env.REDIRECT_DOMAIN
};
