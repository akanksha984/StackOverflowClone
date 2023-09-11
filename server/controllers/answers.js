import mongoose from "mongoose";
import Question from "../models/Question.js";


export const postAnswer= async(req,res)=>{
    const {id: _id}= req.params;
    const {noOfAnswers,answerBody,userAnswered}= req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send("Question does not exist ! ")
    }
    try{
        const updatedQuestion= await Question.findByIdAndUpdate(_id,{
            $addToSet: {
                'answer': [{answerBody,userAnswered,userId:req.userId}]
            }
        })
        updateNoOfQues(_id,noOfAnswers);
        return res.status(200).json(updatedQuestion)
    }catch(error){
        console.log("Error in posting the answer", error);
        return res.status(500).json(error);
    }
}
const updateNoOfQues= async(_id,noOfAnswers)=>{
    try{
        await Question.findByIdAndUpdate(_id,{$set:{'noOfAnswers':noOfAnswers}})
    }catch(error){
        console.log("error in updaing no of ques", error);
        //return res.status(500).json("Error in updating the noOfQues",error)
    }
}

export const deleteAnswer= async(req,res)=>{
    const {id: _id}= req.params;
    const {answerId,noOfAnswers}= req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("Question does not exist")
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)){
        return res.status(404).json("Answer does not exist")
    }
    updateNoOfQues(_id,noOfAnswers);
    try{
        await Question.updateOne(
            {_id},
            {$pull: {'answer':{_id: answerId}}}
        )
        return res.status(200).json({message:"Sucessfully deleted the answer..."})
    }catch(error){
        console.log("error in deleting the answer",error);
        return res.status(405).json({
            error: error,
        })
    }
}