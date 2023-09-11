import * as api from '../api/index';

export const getAllUsers= ()=>async(dispatch)=>{
    try{
        const {data}= await api.fetchAllUsers();
        console.log("fetched users: ", data);
        dispatch({type:'FETCH_USERS', payload: data})
    }catch(error){
        console.log("error in fetching all the users ", error);
    }
}
export const updateProfile= (id,updateData)=> async(dispatch)=>{
    try{
        const {data}= await api.updateProfile(id,updateData); 
        dispatch({type:'UPDATE_USER', payload:data});
    }catch(error){
        console.log("error in updating profile",error)
    }
}