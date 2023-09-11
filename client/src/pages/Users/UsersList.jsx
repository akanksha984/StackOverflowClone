import React from 'react'
import './Users.css'
import { useSelector } from 'react-redux'
import User from './User'

const UsersList = () => {
    const users= useSelector((state)=>state.usersReducer)
    //console.log("users: -> ", users);
  return (
    <div className='userList-container'>
        {
            users.map((user)=>(
                <User user={user} key={user?._id} />
            ))
        }
    </div>
  )
}

export default UsersList