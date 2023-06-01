const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique:true,
        required: [true, "do not leave blank id"]
    },
    title: {
        type:String,
        unique:true,
        required:[true, "do not leave empty title."]
    },
    date: {
        type:Date,
    },
    paragraphs: {
        type: [String],
        required:[true, "do not leave empty paragraphs."]
    },
    author: String,
    status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft'
      }

})

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;