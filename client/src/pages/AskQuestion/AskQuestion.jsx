import React, { useState } from 'react'
import './AskQuestion.css'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { askQuestion } from '../../actions/question'

const AskQuestion = () => {
    const [questionTitle,setQuestionTitle]= useState();
    const [questionBody,setQuestionBody]= useState();
    const [questionTags,setQuestionTags]= useState();
    const dispatch= useDispatch();
    const navigate= useNavigate();
    var User= useSelector((state)=>state.currentUserReducer)
    const handleSubmit= (e)=>{
        e.preventDefault();
        //console.log("got data:-> ",{questionTitle,questionBody,questionTags})
        //console.log(User);
        dispatch(askQuestion({questionTitle,questionBody,questionTags,userPosted: User.result.name},navigate))

    }
    const handleEnter= (e)=>{
        if (e.key === 'Enter'){
            setQuestionBody(questionBody+ '\n');
        }
    }
  return (
    <div className='ask-question'>
        <div className='ask-question-container'>
            <h1>Ask a public Question</h1>
            {/* <p>{questionBody}</p> */}
            <form onSubmit={handleSubmit}>
                <div className="ask-form-container">
                    <label htmlFor='ask-ques-title'>
                        <h4>Title</h4>
                        <p>Be specific and imagine you are asking question to another person</p>
                        <input type='text' id='ask-ques-title' onChange={(e)=>setQuestionTitle(e.target.value)} 
                        placeholder='e.g. Is there a R function for finding the index of an element in a vector?'/>
                    </label>
                    <label htmlFor='ask-ques-body'>
                        <h4>Body</h4>
                        <p>Include all the information someone  would need to answer your question</p>
                        <textarea cols='30' rows='10' id='ask-ques-body'
                        onKeyPress={handleEnter}
                        onChange={(e)=>setQuestionBody(e.target.value)} />
                    </label>
                    <label htmlFor='ask-ques-tags'>
                        <h4>Tags</h4>
                        <p>Add upto 5 tags to describe what your question is about</p>
                        <input type='text' id='ask-ques-tags' onChange={(e)=>setQuestionTags(e.target.value.split(' '))}
                        placeholder='e.g. (xml typescript wordpress)'/>
                    </label>
                </div>
                <input type='submit' value='Review Your Question'className='review-btn' />
            </form>
        </div>
    </div>
  )
}

export default AskQuestion