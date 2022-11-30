// routes/movie.routes.js

const express = require("express");
const router = express.Router();
// routes/movie.routes.js
// ... all imports stay unchanged

// **** require Movie model in order to use it ****
const Movie = require("../models/Movie.model");

// ********* require fileUploader in order to use it *********
const fileUploader = require("../config/cloudinary.config");

//... all the routes stay unchanged

// GET route to display the form to create a new movie
router.get("/movies/create", (req, res) =>
  res.render("movie-views/movie-create")
);
// routes/movie.routes.js

// ... all imports and routes stay untouched

// POST route for saving a new movie in the database
// This route has the image upload example
router.post(
  "/movies/create",
  fileUploader.single("movie-cover-image"),
  (req, res) => {
    console.log(req.file);
    const { title, description } = req.body;

    Movie.create({ title, description, imageUrl: req.file.path })
      .then((newlyCreatedMovieFromDB) => {
        console.log(newlyCreatedMovieFromDB);
        res.redirect("/movies");
      })
      .catch((error) =>
        console.log(`Error while creating a new movie: ${error}`)
      );
  }
);
// routes/movie.routes.js

// ... all imports and routes stay untouched

// GET route to display all the movies
router.get("/movies", (req, res) => {
  Movie.find()
    .then((moviesFromDB) => {
      // console.log(moviesFromDB);
      res.render("movie-views/movies-list.hbs", { movies: moviesFromDB });
    })
    .catch((err) =>
      console.log(`Error while getting the movies from the DB: ${err}`)
    );
});

module.exports = router;

module.exports = router;
