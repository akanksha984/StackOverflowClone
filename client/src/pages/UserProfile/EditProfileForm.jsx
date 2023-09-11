import React, { useState } from 'react'
import './UserProfile.css'
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/users';

const EditProfileForm = ({currentUser,setSwitch}) => {
    const [name,setName]= useState(currentUser?.result?.name);
    const [about,setAbout]= useState(currentUser?.result?.about);
    const [tags,setTags]= useState('');
    const dispatch= useDispatch();
    const id= currentUser?.result?._id;
    const submitHandler= (e)=>{
        e.preventDefault();
        if (tags.length === 0){
            dispatch(updateProfile(id,{name,about, tags:currentUser?.result?.tags}));
        }
        else{
            dispatch(updateProfile(id,{name,about,tags}));
        }
        setSwitch(false);
    }
  return (
    <div>
        <h1 className='edit-profile-title'>Edit Profile</h1>
        <h2 className='edit-profile-title-2'>
            Public Information
        </h2>
        <form className='edit-profile-form' onSubmit={submitHandler}>
            <label htmlFor='name'>
                <h3>Display Name</h3>
                <input type='text' value={name} id='name'
                onChange={(e)=>setName(e.target.value)} />
            </label>
            <label htmlFor='about'>
                <h3>About Me</h3>
                <textarea name='about' id='about' cols='30' rows='10' value={about} 
                onChange={(e)=>setAbout(e.target.value)} />
            </label>
            <label htmlFor='tags'>
                <h3>Watched Tags</h3>
                <p>Add tags separated by single space</p>
                <input type='text' name={tags} id='tags'
                onChange={(e)=>setTags(e.target.value.split(' '))} />
            </label>
            <br/>
            <input type='submit' value='Save Changes' className='user-submit-btn' />
            <button type='button' className='user-cancel-btn'
            onClick={()=>setSwitch(false)}>
                Cancel Changes
            </button>
        </form>
    </div>
  )
}

export default EditProfileForm