const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   email: String,
   nickName: String,
   password: String,
   isAdmin: Boolean,
});

const User = mongoose.model("User", userSchema);
module.exports = User;