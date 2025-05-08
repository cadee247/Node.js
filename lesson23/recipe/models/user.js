"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Encrypt passwords and emails
const { Schema } = mongoose;
const Subscriber = require("./subscriber");

const userSchema = new Schema(
  {
    name: {
      first: {
        type: String,
        trim: true
      },
      last: {
        type: String,
        trim: true
      }
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    zipCode: {
      type: Number,
      min: [1000, "Zip code too short"],
      max: 99999
    },
    password: {
      type: String,
      required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber"
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

// Links user to an existing subscriber
userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email
    })
      .then(subscriber => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch(error => {
        console.log(`Error in connecting subscriber: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

// **Hashes user's email and password before saving**
userSchema.pre("save", async function (next) {
  let user = this;

  try {
    // Hash email if modified
    if (user.isModified("email")) {
      const emailSalt = await bcrypt.genSalt(10);
      user.email = await bcrypt.hash(user.email, emailSalt);
    }

    // Hash password if modified
    if (user.isModified("password")) {
      const passwordSalt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, passwordSalt);
    }

    next();
  } catch (error) {
    console.log(`Error in hashing email or password: ${error.message}`);
    next(error);
  }
});

// Compare hashed password
userSchema.methods.passwordComparison = function (inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
};

// Compare hashed email (used for login or lookup)
userSchema.methods.emailComparison = async function (inputEmail) {
  let user = this;
  return bcrypt.compare(inputEmail, user.email);
};

module.exports = mongoose.model("User", userSchema);