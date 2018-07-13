
//next is a function we call after we call our middleware
module.exports = (req,res, next) => {
  if(req.user.credits < 1 ){
    return res.status(403).send({ error: "Not enough credits"});
  }
  next();
};
