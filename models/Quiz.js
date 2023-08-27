const mongoose = require("mongoose")

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    questions: {
        type: [String],
        required: true
    },
    options:{
        type:[String]
    },
    answers: {
        type: [Number],
        required: true
    },
    isActive: {
        type: Boolean,
        default:false
    }
})

const Quiz = mongoose.model("Quiz", quizSchema)

module.exports = Quiz