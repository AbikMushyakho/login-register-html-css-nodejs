const mongoose = require("mongoose");
const schema = mongoose.Schema;
const VerificationSchema = new schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    code: {
      type: Number,
      required: [true, "Code is required"]
    },
    createdAt: {
      type: Date,
       expires: "10m", 
       default: Date.now },
  }
);
const Verify_Codes = mongoose.model("codes", VerificationSchema);
module.exports = Verify_Codes;
