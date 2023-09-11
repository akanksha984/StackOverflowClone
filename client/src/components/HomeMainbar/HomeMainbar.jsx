import React from 'react'
import './HomeMainbar.css'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Questions from '../Questions/Questions'
import { useSelector } from 'react-redux'

const HomeMainbar = () => {
  /* var questionsList= [
    {
      _id: 1,
      upVotes: 3,
      downVotes:1,
      noOfAnswers: 2,
      questionTitle: "What is a function?",
      questionBody: "It is meant to be ... ",
      questionTags: ['Java','C++','C','ReactJS'],
      userPosted: "Akanksha",
      userId: 1,
      askedOn: "nov 30",
      answer:[{
        answerBody:"This is an answer",
        userAnswered: "Magical",
        answeredOn: "oct 10",
        userId: 2,
      }]
    },{
      _id: 2,
      upVotes: 0,
      downVotes:1,
      noOfAnswers: 0,
      questionTitle: "What is a function?",
      questionBody: "It is meant to be ... ",
      questionTags: ['Java','C++','C','ReactJS'],
      userPosted: "Akanksha",
      userId: 1,
      askedOn: "nov 30",
      answer:[{
        answerBody:"This is an answer",
        userAnswered: "Magical",
        answeredOn: "oct 10",
        userId: 2,
      }]
    },{
      _id: 3,
      upVotes: 1,
      downVotes:1,
      noOfAnswers: 0,
      questionTitle: "What is a function?",
      questionBody: "It is meant to be ... ",
      questionTags: ['Java','C++','C','ReactJS'],
      userPosted: "Akanksha",
      userId: 1,
      askedOn: "nov 30",
      answer:[{
        answerBody:"This is an answer",
        userAnswered: "Magical",
        answeredOn: "oct 10",
        userId: 2,
      }]
    }
  ] */
  
  var questionsList= useSelector((state)=>state.questionsReducer)
  questionsList= questionsList.data;
  //console.log(questionsList);
  const location= useLocation();
  const navigate= useNavigate();
  const user= useSelector((state)=>state.currentUserReducer);
  console.log("current user hai: ", user);
  const redirect= ()=>{
    if (user===null){
      alert("You must be logged in to ask an question! ");
      navigate('/Auth');
    }
    else{
      navigate('/AskQuestion');
    }
  }
  return (
    <div className='main-bar'>
      <div className='main-bar-header'>
      {
        location.pathname==='/' ?
        <h1>Top Questions</h1>
        :<h1>All Questions</h1>
      }
      <button onClick={redirect} className='ask-btn'>
        Ask Question
      </button>
      </div>
      <div>
      {
        questionsList ===null ?
        <h1>Loading...</h1>
        :<>
          <p>{questionsList.length} questions</p>
          <>
          {
            questionsList.map((question)=>(
                <Questions question={question} key={question._id} />
            ))
          }
          </>
        </>
      }
      </div>
    </div>
  )
}

export default HomeMainbar