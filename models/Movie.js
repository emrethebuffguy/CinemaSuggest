const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        required: [true, "do not leave empty title"]
    },
    date: {
        type: Number
    },
    duration: {
        type:Number
    },
    genre:{
        type: [String]
    },
    imdb_score:{
        type:Number
    },
    meta_score: Number,
    country: String,
    language: String,
    movie_type: String,
    popularity:String,
    director: String,
    actors: [String],
    warning_tags: [String],
    poster_link: String,
    points: Number,
    noMatch: [String],
    features: [String]
});
const Movie = mongoose.model("Movie",movieSchema);

module.exports = Movie;