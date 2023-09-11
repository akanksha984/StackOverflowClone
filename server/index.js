//const express= require('express');

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/users.js'
import questionRoutes from './routes/questions.js'
import answerRoutes from './routes/answers.js'


const app= express();
app.use(express.json({limit:"30mb", extended: true}))
app.use(express.urlencoded({lim:"30mb" , extended:true}))
app.use(cors())
dotenv.config();

app.get('/',(req,res)=>{
    res.send("This is a stackoverflow clone api")
})

app.use('/user', userRoutes);
app.use('/questions',questionRoutes);
app.use('/answers',answerRoutes);

const PORT= process.env.PORT || 5000;
const CONNECTION_URL= process.env.DATABASE_URL
mongoose.connect(CONNECTION_URL,{
    useNewUrlParser: true, useUnifiedTopology:true
})
.then(()=> app.listen(PORT,()=>{console.log(`server is running at port ${PORT}`)}))
.catch((err)=>{console.log(err.message)});
