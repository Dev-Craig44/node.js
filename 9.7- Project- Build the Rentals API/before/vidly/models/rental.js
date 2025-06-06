// Create a new rental
// POST /api/rentals

//Get the list of rentals
// Get /api/rentals

import mongoose, { Schema } from "mongoose";
import { Customer } from "./customer";
import { Movie } from "./movie";
import express from "express";
const router = express.Router();

const rental = mongoose.model(
  "Rental",
  new Schema({
    title: string,
    daysRented: number,
  })
);

function validateRental(rental) {}
