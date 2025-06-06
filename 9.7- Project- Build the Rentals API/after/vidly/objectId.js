const mongoose = require("mongoose");
const id = new mongoose.Types.ObjectId();

const isValid = mongoose.Types.ObjectId("1234");
console.log(isValid);
