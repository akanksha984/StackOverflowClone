import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import './Questions.css'
import moment from 'moment'
import {useDispatch, useSelector} from 'react-redux';
import { deleteAnswer } from '../../actions/question'

const DisplayAnswers = ({question,handleShare}) => {
    const User= useSelector((state)=>state.currentUserReducer)
    const dispatch= useDispatch();
    const {id}= useParams();
    const handleDelete= (answerId, noOfAnswers)=>{
        dispatch(deleteAnswer(id,answerId,noOfAnswers))
    }
  return (
    <div>
        {
            question.answer.map((ans)=>(
                <div className='display-ans' key={ans._id}>
                    <p>{ans.answerBody}</p>
                    <div className='question-actions-user'>
                        <div>
                            <button type='button' onClick={handleShare}>Share</button>
                            {/* {console.log("user is : ",User?.result?._id)}
                            {console.log("Ans:" ,ans.userId)} */}
                            {
                                User && User?.result?._id === ans?.userId && (
                                    <button type='button' onClick={()=>handleDelete(ans._id,question.noOfAnswers)}>Delete</button>
                                )
                            }
                        </div>
                        <div>
                            <p>Answered on {moment(ans.answeredOn).fromNow()}</p>
                            <Link to={`/Users/${ans.userId}`} className='user-link' style={{color:'#0086d8'}}>
                                <Avatar backgroundColor="green" px='8px' py='8px'>
                                    {ans.userAnswered.charAt(0).toUpperCase()}
                                </Avatar>
                                <div>
                                    {ans.userAnswered}
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default DisplayAnswers