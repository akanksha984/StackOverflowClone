import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import upvote from '../../assets/sort-up.svg'
import downvote from '../../assets/sort-down.svg'
import './Questions.css'
import { Link } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import DisplayAnswers from './DisplayAnswers'
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuestion, postAnswer, voteQuestion } from '../../actions/question'
import moment from 'moment'
import copy from 'copy-to-clipboard'

const QuestionDetails = () => {
    /* var questionsList= [
        {
          _id: '1',
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
          },{
            answerBody:"This is an answer2",
            userAnswered: "Magical",
            answeredOn: "oct 10",
            userId: 2,
          }]
        },{
          _id: '2',
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
          _id: '3',
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
    const {id}= useParams();
    var questionsList= useSelector((state)=>state.questionsReducer)
    questionsList= questionsList.data;
    console.log(questionsList);
    const [answer,setAnswer]= useState('');
    const User= useSelector((state)=>state.currentUserReducer);
    const navigate= useNavigate();
    const dispatch= useDispatch();
    const location= useLocation();
    const url= 'http://localhost:3000';
    const postAnswerHandler= (e,answerLength)=>{
        e.preventDefault();
        if (User === null){
            alert("You must login to answer the question");
            navigate('/Auth');
        }else{
            if (answer===''){
                alert("Enter an answer before submitting");
            }
            else{
                dispatch(postAnswer({id,noOfAnswers:answerLength+1, answerBody: answer, userAnswered: User.result.name}));
                setAnswer('');
            }
        }
    }
    const handleShare= ()=>{
        copy(url+location.pathname);
        alert("Copied the url successfully: "+url+location.pathname);
    }
    const deleteHandler= ()=>{
        dispatch(deleteQuestion(id,navigate));
    }
    const handleUpvote= ()=>{
        dispatch(voteQuestion(id,'upvote',User?.result?._id));
    }
    const handleDownvote= ()=>{
        dispatch(voteQuestion(id,'downvote',User?.result?._id))
    }

    //console.log(User);
  return (
    <div className='question-details-page'>
        {
            questionsList===null?
            <h1>Loading...</h1>
            :<>
                {
                    questionsList.filter(question =>question._id === id)
                    .map((question)=>(
                        <div key={question._id}>
                            <section className='question-details-container'>
                                <h1>{question.questionTitle}</h1>
                                <div className='question-details-container-2'>
                                    <div className='question-votes'>
                                        <img src={upvote} alt="upvote" className='votes-icon' width='18' 
                                        onClick={handleUpvote}/>
                                        <p>{question.upVotes.length - question.downVotes.length}</p>
                                        <img src={downvote} alt="downvote" className='votes-icon' width='18' 
                                        onClick={handleDownvote}/>
                                    </div>
                                    <div style={{width:"100%"}}>
                                        <p className='question-body'>{question.questionBody}</p>
                                        <div className='question-details-tags'>
                                            {
                                                question.questionTags.map((tag)=>(
                                                    <p key={tag}>{tag}</p>
                                                ))
                                            }
                                        </div>
                                        <div className='question-actions-user'>
                                            <div>
                                                <button type='button' onClick={handleShare}>Share</button>
                                                {/* {console.log(User?.result?.name)}
                                                {console.log("ques user",question?.userPosted)} */}
                                                {/* {console.log("User id",User.result._id)}
                                                {console.log("ques userID: ",question.userId)} */}
                                                {
                                                    
                                                    User && User?.result?._id===question?.userId && (
                                                        <button type='button' onClick={deleteHandler}>Delete</button>
                                                    )
                                                } 
                                            </div>
                                            <div>
                                                <p>asked {moment(question.askedOn).fromNow()}</p>
                                                {/* {console.log("this ques", question)} */}
                                                <Link to={`/Users/${question.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                                    <Avatar backgroundColor="orange" px='8px' py='8px'>
                                                        {question.userPosted.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {
                                question.noOfAnswers!==0 && (
                                    <section>
                                        <h3>{question.noOfAnswers} answers</h3>
                                        <div className=''>
                                            <DisplayAnswers key={question._id} question={question} handleShare={handleShare} />
                                        </div>
                                    </section>
                                )
                            }
                            <div className='post-ans-container'>
                                <h3>Your Answer</h3>
                                <form onSubmit={(e)=>{postAnswerHandler(e,question.answer.length)}}>
                                    <textarea name="" id="" cols="30" rows="10"
                                    value={answer}
                                    onChange={(e)=>setAnswer(e.target.value)} ></textarea>
                                    <br/>
                                    <input type='submit' value='Post Your Answer' className='post-ans-btn'/>
                                </form>
                                <p>
                                    Browse other Questions tagged
                                    {
                                        question.questionTags.map((tag)=>(
                                            <Link to='/Tags' key={tag} className='ans-tags'>
                                                {tag}
                                            </Link>
                                        ))
                                    }
                                    or
                                    <Link to='/AskQuestion' style={{textDecoration:"none", color:'#009dff'}}>
                                        Ask your own Question
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))
                }
            </>
        }
    </div>
  )
}

export default QuestionDetails