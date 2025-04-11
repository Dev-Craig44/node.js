const jwt = require("jsonwebtoken");
const config = require("config");
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

  //  create a [token] variable using the jwt sign method and give it a payload ( { _id: user._id } ), and a [privateKey( used to create a private signature )] to jwt {sign} method **dont not store secrets in source code**

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  // *** FINALLY***
  // for any custom headers that we define in our application we should prefix this header with 'x-' to avoid any conflicts with the standard headers. This is a convention that is followed in the HTTP protocol. second argument is the value which in this case is our token

  // give [user] and an array of selectors to the lodash {pick} method and send it to the express {send} method after we give 'x-auth-token' to the express {header} method
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;

// Look into joi password complexity for more advance password validations
