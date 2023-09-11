import * as api from '../api/index'

export const askQuestion= (questionData,navigate)=>async(dispatch)=>{
    try{
        const {data}= await api.postQuestion(questionData)
        dispatch({type:"POST_QUESTION", payload:data})
        dispatch(fetchAllQuestions());
        navigate('/');
    }catch(error){
        console.log("Error in posting question ",error);
    }
}

export const fetchAllQuestions= ()=> async(dispatch)=>{
    try{
        const {data}= await api.getAllQuestions();
        //console.log("got data as:-> ", data);
        const data1= data.questionList;
        dispatch({type:"FETCH_ALL_QUESTIONS",payload:data1})
    }catch(error){
        console.log("error in fetching all the questions ",error);
    }
}

export const deleteQuestion= (id,navigate)=> async(dispatch)=>{
    try{
        const {data}= await api.deleteQues(id);
        dispatch(fetchAllQuestions());
        navigate('/')
    }catch(error){
        console.log("ERror in deleting the question", error)
    }
}

export const voteQuestion= (id,value,userId)=>async(dispatch)=>{
    try{
        const {data}= await api.voteQuestion(id,value,userId);
        dispatch(fetchAllQuestions());
    }catch(error){
        console.log("error in vote question", error);
    }
}



export const postAnswer= (answerData)=> async(dispatch)=>{
    try{
        const {id,noOfAnswers,answerBody,userAnswered}= answerData;
        const {data}= await api.postAnswer(id,noOfAnswers,answerBody,userAnswered);
        //console.log("psot ans data -> ",data);
        dispatch({type:"POST_ANSWER", payload: data});
        dispatch(fetchAllQuestions());
    }catch(error){
        console.log("error in post answer", error);
    }
}

export const deleteAnswer= (id,answerId,noOfAnswers)=>async(dispatch)=>{
    try{
        const {data}= api.deleteAns(id,answerId,noOfAnswers);
        dispatch(fetchAllQuestions());
    }catch(error){
        console.log("error in delete answer",error);
    }
}