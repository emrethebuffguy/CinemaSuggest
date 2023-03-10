const express = require("express")
const fs = require('fs');
const {getMovies} = require("../controllers/getMovies")

const router = express.Router();

router.route("/").get(getMovies);

module.exports = router;