"use strict";

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const webauthnSchema = new mongoose.Schema({
  active: { default: false, type: Boolean, required: true },
  authenticators: [],
  id: { type: String, required: false }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  webauthn: { type: webauthnSchema, required: true }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    { _id: this._id, name: this.name, fidoAuth: false },
    config.get("jwtPrivateKey")
  );
  return token;
};

userSchema.pre("save", function(next) {
  this.updated = new Date();
  return next();
});

const User = mongoose.model("User", userSchema);

exports.User = User;
