const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //Valdate what's inside the body using validation function from the user Model file and destructure it to a error variable
  const { error } = validate(req.body);

  // Check to see if there's an error in |error|  and if that's true, send a 400 code using express's status method and send an error message using express send method *DEAD*
  if (error) return res.status(400).send(error.details[0].message);

  // ***** Make sure user is not already created*****

  // Look for the email value using the [req.body] variable and store it in the a [user] variable
  let user = await User.findOne({ email: req.body.email });

  // not sending a 404 because I don't want to tell the client why this shit failed.

  // check to see if the | user | variable is not there, and if true, give | "Invail Message" | to  express {send} method, and give | 400 | to express { status } method. *DEAD*
  if (!user) return res.status(400).send("Invalid email or password.");

  // give the | req body password | and the | user password | to bcrypt {compare} method. await it and put it in a [validatePassword] variable. This value will be a Boolean
  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  // check to see if the [validatePassword] variable is not true, and if true, give | "Invail Message" | to  express {send} method, and give | 400 | to express { status } method. *DEAD*
  if (!validatePassword)
    return res.status(400).send("Invalid email or password.");

  // take the {generateAuthToken} method on the [user] object and put it in a [token] variable
  const token = user.generateAuthToken();

  // -if you get to this point then this is a valid login.

  //   give JSON Web [token] (A long string that iditifies a user aka drivers license for your password) to express {send} method
  res.send(token);
});

// Information Expert Principle
// an object that is a expert in a given area should be responsible for making decisions and performing tasks.

// because user is an expert in the area of user validation, we should put the validation logic inside the user model.

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;

// Look into joi password complexity for more advance password validations
