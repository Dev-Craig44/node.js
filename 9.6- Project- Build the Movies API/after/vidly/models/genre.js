const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

function validateGenre(genre) {
  // 1.) Define a Joi v17 schema object for validation.
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  // 2.) Use the schema.validate(value) API (v17) instead of Joi.validate.
  return schema.validate(genre);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;
