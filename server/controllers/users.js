import User from '../models/User.js'
import mongoose from 'mongoose'

export const getAllUsers= async(req,res)=>{
    try{
       const allUsers= await User.find();
       const allUsersDetails= [];
       allUsers.forEach(user=>{
        allUsersDetails.push({_id: user._id, name:user.name, about:user.about, tags:user.tags, joinedOn:user.joinedOn })
       })
       res.status(200).json(allUsersDetails);
    }catch(error){
        console.log("Could not get all user details ", error);
        res.status(500).json({
            message: "Could not fetch all user details",
            error: error,
        })
    }
} 

export const updateProfile= async(req,res)=>{
    const {id: _id}= req.params;
    const {name,about,tags}= req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(4004).json({
            message: "User does not exist",
        })
    }
    try{
        const updatedProfile= await User.findByIdAndUpdate(_id,{
            $set: {
                'name':name,
                'about': about,
                'tags': tags,
            }
        },{new:true});
        res.status(200).json(updatedProfile);
    }catch(error){
        console.log("error in updating the profile: ", error);
        return res.status(500).json({
            message: "Error in updating the profile",
            error: error,
        })
    }
}