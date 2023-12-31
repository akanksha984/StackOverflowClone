import mongoose from 'mongoose'

const questionSchema= mongoose.Schema({
    questionTitle: {
        type: String,
        required:"Question must have a title",
    },
    questionBody: {
        type: String,
        required:"Question must have a description",
    },
    questionTags: {
        type: [String],
        required:"Question must have some tags",
    },
    noOfAnswers: {
        type: Number,
        default: 0,
    },
    upVotes: {
        type: [String],
        default:[],
    },
    downVotes: {
        type: [String],
        default: [],
    },
    userPosted: {
        type: String,
        required: "Question must have an author",
    },
    userId:{
        type: String,
    },
    askedOn:{
        type: Date,
        default: Date.now(),
    },
    answer: [{
        answerBody:String,
        userAnswered: String,
        userId: String,
        answeredOn:{type: Date, default: Date.now}
    }]

})

export default mongoose.model("Question",questionSchema);