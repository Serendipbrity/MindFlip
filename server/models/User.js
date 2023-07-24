const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');

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
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    // the users flashcards
    flashcards: [{ type: Schema.Types.ObjectId, ref: "FlashCards" }],
    // the users friends
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
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

// before saving a user, encrypt the password
userSchema.pre('save', function (next) {
  // "this" refers to the current document about to be saved
  let user = this;
  // check if the password has been modified
  if (!user.isModified('password')) return next();
// generate a random string (salt)
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);
// hash the password along with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      // if error, stop the function
      if (err) return next(err);
      // otherwise replace the password with the hash
      user.password = hash;
      // continue to next middleware function if there is one
      next();
    });
  });
});

// generate a hash for the given password
userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, "secret");
}

// compare the given password with the database hash
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};


const User = mongoose.model("User", userSchema);

module.exports = User;
