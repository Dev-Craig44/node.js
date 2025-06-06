import Joi from "joi";
import mongoose, { Schema } from "mongoose";

const Movie = mongoose.model(
  "Movie",
  new Schema({
    title: string,
    genre: { genreSchema },
    numberInStock: number,
    dailyRentalRate: number,
  })
);

function validateMovie(movie) {
  const schema = {
    title: Joi,
    genre: { genreSchema },
    numberInStock: number,
    dailyRentalRate: number,
  };

  return Joi.validate(movie, schema);
}

export { Movie, validateMovie };
