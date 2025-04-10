const bcrypt = require("bcrypt");

// Create a salt for hashing a password

// create the async {run} function and give it a | password | and this will run our implementation
async function run(password) {
  // give the number of rounds to the awaited bcrypt genSalt method and put it in a | salt | variable
  const salt = await bcrypt.genSalt(10);

  // give the bcrpt hash method the | password | and the | salt | to create the | hashed | variable;
  const hashed = await bcrypt.hash(password, salt);

  // log | salt | on the console
  console.log(salt);

  // log | hashed | on the console
  console.log(hashed);
}

// run the  {run} function we just made
run("chicken");
