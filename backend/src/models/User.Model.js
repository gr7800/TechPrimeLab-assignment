// Importing the mongoose library
const mongoose = require("mongoose");

// Creating the User schema
const UserSchema = mongoose.Schema({
  email: String,     // Field to store the user's email
  password: String   // Field to store the user's password
});

// Creating the User model based on the User schema
const UserModel = mongoose.model("user", UserSchema);

// Exporting the UserModel to be used in other files
module.exports = { UserModel };
