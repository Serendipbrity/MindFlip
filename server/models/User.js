const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");
const FlashCards = require("./FlashCards");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/.+@.+\..+/, "Must match an email address!"],
        },
    // encrypt password later
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    // the users flashcards
    flashcards: [FlashCards],
    // the users friends
    friends: [User],
    // for greeting on login
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
