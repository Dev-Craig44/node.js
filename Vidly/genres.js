import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { dbDebugger } from "./index.js";
const genresRouter = express.Router();

dotenv.config();
const MongodbUri = process.env.MONGODB_URI;

genresRouter.use((err, req, res, next) => {
  res.status(500).send({ message: "Internal server error" });
});

mongoose
  .connect(MongodbUri)
  .then(() => {
    dbDebugger("Connected to MongoDB...");
  })
  .catch((err) => dbDebugger("Could not connect..."));

const Genre = mongoose.model(
  "Genre",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    price: {
      type: Number,
      get: (v) => Math.round(v),
      set: (v) => Math.round(v),
    },
    tags: {
      type: Array,
      validate: {
        validator: function (v) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (v.includes("Horror")) {
                resolve(true);
              } else {
                reject(false);
              }
            }, 4000);
          });
        },
        message: "Needs to be more than 5...",
      },
    },
    inStore: {
      type: Number,
      validate: {
        validator: function (v) {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (v > 5) {
                resolve(true);
              } else {
                reject(false);
              }
            }, 5000);
          });
        },
      },
    },
  })
);

genresRouter.get("/", async (req, res) => {
  // 1.) Setup a try/catch block and put implementation inside of it.
  try {
    const genres = await Genre.find();
    res.send(genres);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

genresRouter.get("/:id", async (req, res) => {
  try {
    const genreId = req.params.id;
    const genre = await Genre.findById(genreId);
    if (!genre) {
      return res.status(404).send({ message: "Genre not found." });
    }
    res.send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

genresRouter.post("/", async (req, res) => {
  try {
    const genreName = req.body.name;
    const genreTags = req.body.tags;
    const genrePrice = req.body.price;
    const genreInStore = req.body.inStore;

    let genre = new Genre({
      name: genreName,
      tags: genreTags,
      price: genrePrice,
      inStore: genreInStore,
    });

    genre = await genre.save();

    res.send(genre);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

genresRouter.put("/:id", async (req, res) => {
  try {
    const genreId = req.params.id;
    const updatedData = req.body;

    const updatedGenre = await Genre.findByIdAndUpdate(
      genreId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!updatedGenre) {
      return res.status(404).send({ message: "Genre not found." });
    }

    res.send(updatedGenre);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while processing you request." });
  }
});

genresRouter.delete("/:id", async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    res.send(genre);
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred while processing your request..." });
  }
});

genresRouter.delete("/deleteByName/:name", async (req, res) => {
  try {
    const results = await Genre.deleteMany({ name: req.params.name });
    res
      .status(200)
      .json({ message: `${results.deletedCount} docs were removed...` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { genresRouter };
