import axios from 'axios'
import { getAllUsers } from '../actions/users';
const API= axios.create({baseURL:'http://localhost:5000'})

API.interceptors.request.use((req)=>{
    if (localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
})

export const login= (authData)=> API.post('/user/login',authData);
export const signup= (authData)=> API.post('/user/signup',authData);

export const postQuestion= (questionData)=> API.post('/questions/Ask',questionData)
export const getAllQuestions= ()=> API.get('/questions/get');
export const deleteQues= (id)=> API.delete(`/questions/delete/${id}`);
export const voteQuestion= (id,value,userId)=> API.patch(`/questions/vote/${id}`,{value,userId})

export const postAnswer= (id,noOfAnswers,answerBody,userAnswered)=> API.patch(`/answers/post/${id}`,{noOfAnswers,answerBody,userAnswered})
export const deleteAns= (id,answerId,noOfAnswers)=> API.patch(`/answers/delete/${id}`,{answerId,noOfAnswers})

export const fetchAllUsers= ()=> API.get('/user/getAllUsers',getAllUsers);
export const updateProfile= (id,updateData)=> API.patch(`/user/update/${id}`,updateData)

