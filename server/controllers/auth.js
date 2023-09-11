import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const signup= async(req,res)=>{
    //console.log("backend mein hai")
    const {name,email,password}= req.body;
    try{
        const existingUser= await User.findOne({email});
        if (existingUser){
            return res.status(404).json({
                message: "User already exists",
            })
        }
        //console.log("no user such exists as per now")
        const hashedPassword= await bcrypt.hash(password,12);
        const newUser= await User.create({name,email,password:hashedPassword})
        const token= jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{
            expiresIn: '1hr',
        })
        return res.status(200).json({
            result: newUser,
            token,
        })
    }catch(error){
        console.log("error in signup",error.message);
        return res.status(500).json("Something went wrong");
    }
}
export const login= async(req,res)=>{
    const {email,password}= req.body;
    try{
        const existingUser= await User.findOne({email});
        if (!existingUser){
            return res.status(404).json({
                message: "User does not exist",
            })
        }
        const isPasswordCorrect= await bcrypt.compare(password,existingUser.password);
        if (!isPasswordCorrect){
            return res.status(400).json({
                message:"Incorrect password"
            })
        }
        const token= jwt.sign({email:existingUser.email, id:existingUser._id},process.env.JWT_SECRET,{
            expiresIn:'1h',
        });
        return res.status(200).json({
            result: existingUser,
            token,
        })

    }catch(error){
        console.log("Error in login",error.message);
        return res.status(500).json("Error in login");
    }
}