const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "User Name is requried!!!"],
  },
  email: {
    type: String,
    required: [true, "Email is required!!!"],
  },
  password: {
    type: String,
    required: [true, "Password is required!!!"],
  },
  phone_no: {
    type: Number,
    required: [true, "Phone number is required!!!"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});
const Users = mongoose.model("acs_users", UserSchema);
module.exports = Users;
