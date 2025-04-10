const _ = require("lodash");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  //Valdate what's inside the body using validation function from the user Model file and destructure it to a error variable
  const { error } = validate(req.body);

  // Check to see if there's an error in |error|  and if that's true, send a 400 code using express's status method and send an error message using express send method *DEAD*
  if (error) return res.status(400).send(error.details[0].message);

  // ***** Make sure user is not already created*****

  // Look for the email value using the req body and store it in the a user variable
  let user = await User.findOne({ email: req.body.email });

  // check to see if the user variable is indeed carrying a user and if they are send them the 400 and tell them somebody is already here like that. *DEAD*
  if (user) return res.status(400).send("User already registered.");

  // Create the user variable using the User Model and give it an object with the name, email, and password key/value pairs
  user = new User(_.pick(req.body, ["name", "email", "password"]));

  // give the number of rounds to the awaited bcrypt genSalt method and put it in a | salt | variable
  const salt = await bcrypt.genSalt(10);

  // give the bcrpt hash method the | password | and the | salt | to create the | hashed | variable;
  user.password = await bcrypt.hash(user.password, salt);

  // Save this user using the database's save method and await it. Check if parent function is async.
  await user.save();

  // *** FINALLY***
  //
  // Send the user's name and email to whoever made the request, using express's send method. Make sure you don't sent the password.
  res.send(_.pick(user, ["id", "name", "email"]));
});

module.exports = router;

// Look into joi password complexity for more advance password validations
