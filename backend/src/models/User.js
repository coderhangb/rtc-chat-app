const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      minlength: [6, "Password must have at least 6 characters"],
      required: [true, "Please enter an password"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }, //createAt && updateAt
);

// hash password
userSchema.pre("save", async function () {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
