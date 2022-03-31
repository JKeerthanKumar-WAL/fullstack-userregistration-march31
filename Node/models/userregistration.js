var mongoose = require("mongoose");
var UserRegistrationSchema = new mongoose.Schema({
  username: { type: String, required: true, maxLength: 100 },
  email: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
});
module.exports = mongoose.model("UserRegistration", UserRegistrationSchema);
