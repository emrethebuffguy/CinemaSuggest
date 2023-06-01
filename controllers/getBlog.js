const express = require("express");
const { findByIdAndDelete } = require("../models/Blog");
const Blog = require("../models/Blog");

exports.getBlog = async (req, res) => {
  var data = await Blog.find({});

  res.json({
    status: "success",
    data: data,
  });
};

exports.getBlogFrontEnd = async (req, res, next) => {
  var data = await Blog.find({ status: "published" }).select([
    "-status",
    "-_id",
  ]);

  res.json({
    status: "success",
    data: data,
  });
};

exports.updateBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json({
      status: "success",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    next(
      res.json({
        status: "error",
        message: "Couldnt connect to the server, please try again later.",
        errorMessage: error.message,
      })
    );
  }
};

exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    res.status(201).json({
      status: "successfully deleted",
      data: blog,
    });
  } catch (error) {
    console.log(error);
    next(
      res.json({
        status: "error",
        message: "Couldnt connect to the server, please try again later.",
        errorMessage: error.message,
      })
    );
  }
};

exports.addBlog = async (req, res, next) => {
  let {title,  paragraphs, author, status } = req.body;
  let id = null;

  const distinctValues = await Blog.find({}).distinct("id")

  for(let i = 1;i<10000; i++){
    if(distinctValues.includes(i)){
      continue;
    }
    else{
      console.log(i);
      id = i;
      break;
    }
  }


  
  

  const check = id && title && paragraphs && author && status

  if (check) {
    try {
      let newBlog = {
        id,
        title,
        paragraphs,
        author,
        status,
        date: new Date(Date.now())
      };
      const data = await Blog.create(newBlog);
      res.status(201).json({
        status: "successfully saved",
        data: data,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        status: "error",
        message: "Failed to create new blog",
        errorMessage: error.message,
      });
    }
  }
};
