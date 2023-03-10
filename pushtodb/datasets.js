const mongoose = require("mongoose");
const Movie = require("../models/Movie.js");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const fs = require("fs");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection established"));

setTimeout(async () => {
    try{
    const distinctValues = await Movie.distinct("features");
    const bosnian = await Movie.find({movie_type:"Animation"});
    console.log(distinctValues);
    //fs.writeFile("../client/src/utils/directors.txt",JSON.stringify(distinctValues),"utf-8", err => console.log(err))
    }
    catch(e){
        console.log(e)
    }
}, 5000);
