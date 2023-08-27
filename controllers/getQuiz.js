const express = require("express");

const Quiz = require("../models/Quiz.js");

exports.getWeeklyQuiz = async (req, res) => {
  var quiz = await Quiz.findOne({ isActive: true });

  if (quiz) {
    res.json({success:true, data: quiz});
  }
  else{
    res.json({success:false, message:"something went wrong"});
  } 
};
