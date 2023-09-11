import mongoose from "mongoose";
import Question from "../models/Question.js"

export const askQuestion= async(req,res)=>{
    const postQuestionData= req.body;
    const postQuestion= new Question({
        ...postQuestionData,
        userId: req.userId
    })
    try{
        await postQuestion.save();
        console.log("posted ques-> ",postQuestion);
        return res.status(200).json({
            message: "Posted question successfully",
        })
    }catch(error){
        console.log("error in question creation");
        return res.status(409).json({
            message: "Error in asking question",
            error: error,
        })
    }
}

export const getAllQuestions= async(req,res)=>{
    try{
        console.log("req.userid ",req.userId);
        const questionList= await Question.find();
        return res.status(200).json({
            questionList,
        })
    }catch(error){
        console.log("error in getting questions ",error);
        return res.status(500).json({
            error: error,
            message: "Error in getting questions"
        })
    }
}

export const deleteQuestion= async(req,res)=>{
    const {id: _id}= req.params;
    try{
        if (!mongoose.Types.ObjectId.isValid(_id)){
            return res.status(404).json("Question does not exist");
        }
        await Question.findByIdAndRemove(_id);
        return res.status(200).json({message:"Deleted the question successfully"});

    }catch(error){
        console.log("error in deleting a question", error);
        return res.status(500).json({message:"Error in deletion", error: error})
    }
}

export const voteQuestion= async(req,res)=>{
    const {id: _id}= req.params;
    const {value,userId}= req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json({
            message: "Question does not exist",
        })
    }
    try{
        const question= await Question.findById(_id);
        const upIndex= question.upVotes.findIndex((id)=> id===String(userId));
        const downIndex= question.downVotes.findIndex((id)=>id===String(userId))

        if (value==='upvote'){
            // user has already downvoted, remove user from downvote list
            if (downIndex !== -1){
                question.downVotes= question.downVotes.filter((id)=> id!==String(userId))
            }
            // not upvoted yet, upvote by user
            if (upIndex === -1){
                question.upVotes.push(userId)
            }else{  // remove the vote -- like upvote ko dobara se click karne pe upvote hatana
                question.upVotes= question.upVotes.filter((id)=> id!== String(userId))
            }
        }
        else if (value==='downvote'){
            // if user has already upvoted, remove the upvote
            if (upIndex !== -1){
                question.upVotes= question.upVotes.filter((id)=> id!== String(userId))
            }
            // if not downvoted
            if (downIndex === -1){
                question.downVotes.push(userId);
            }
            else{
                // ques is already downvoted remove the down vote
                question.downVotes= question.downVotes.filter((id)=> id!== String(userId))
            }
        }
        await Question.findByIdAndUpdate(_id,question);
        return res.status(200).json({
            message: "Added vote successfully"
        })
    }catch(error){
        console.log("Error in vote question", error);
        return res.status(500).json({
            message: "Error in vote ques backend",
            error: error,
        })
    }
}