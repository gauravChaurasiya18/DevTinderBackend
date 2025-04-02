const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const URL_LINK =
  "https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      default: 19,
    },
    gender: {
      type: String,
      default: "male",
    },
    photoUrl: {
      type: String,
      default:
        "https://futureoflife.org/wp-content/uploads/2020/08/elon_musk_royal_society.jpg",
    },
    about: {
      type: String,
      default: "This is a default of your user",
    },
    skills: {
      type: [String],
      default: ["Javascript", "HTML"],
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "dsjfherfbc", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash
  );
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
