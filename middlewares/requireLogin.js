
//next is a function we call after we call our middleware
module.exports = (req,res, next) => {
  if(!req.user){
    return res.status(401).send({ error: "You must log in!"});
  }
  next();
};
