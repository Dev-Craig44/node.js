import { Movie, validateMovie } from "../models/movie";
import { Genre } from "../models/genre";
import mongoose from "mongoose";
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  Movie.find;
});
