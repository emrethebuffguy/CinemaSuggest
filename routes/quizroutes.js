const express = require("express")
const fs = require('fs');
const {getWeeklyQuiz} = require("../controllers/getQuiz")

const router = express.Router();

router.route("/").get(getWeeklyQuiz);

module.exports = router;