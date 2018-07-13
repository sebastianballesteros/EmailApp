const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipientSchema = new Schema({
  email: String,
  responded: { type:Boolean, default: false }
});

//mongoose.model("recipients", userSchema); <-- NO
module.exports = recipientSchema;
