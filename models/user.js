const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1021,
  },
});

// add a method to the userSchema object.
// create a method called {generateAuthToken} on the userSchema object
// change function to an arrow function because arrow functions don't have their own this context
// if you use a regular function, this will refer to the global object, not the user object
// if you want to create a method that is part of an object, you should not use an arrow function
userSchema.methods.generateAuthToken = function () {
  // this is the user object

  // -if you're building with react you can store these tokens on the local storage.

  //   -if you're building on a mobile app you have a similar option like local storage.

  //   -head to JWT.io that as a debugger for working JSON tokens

  // give a [payload]( { _id: this._id } ), and a [privateKey( used to create a private signature )] to jwt {sign} method and store the string in a [token] variable **dont not store secrets in source code**
  const token = jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
