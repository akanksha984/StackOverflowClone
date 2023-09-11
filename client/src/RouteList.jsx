import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Auth from './pages/Auth/Auth'
import Questions from './components/Questions/Questions'
import AskQuestion from './pages/AskQuestion/AskQuestion'
import DisplayQuestion from './components/Questions/DisplayQuestion'
import Tags from './pages/Tags/Tags'
import Users from './pages/Users/Users'
import UserProfile from './pages/UserProfile/UserProfile'

const RouteList = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/Auth' element={<Auth/>} />
          <Route path='/Questions' element={<Home/>} />
          <Route path='/AskQuestion' element={<AskQuestion/>} />
          <Route path='/Questions/:id' element={<DisplayQuestion/>} />
          <Route path='/Tags' element={<Tags/>} />
          <Route path='/Users' element={<Users/>} />
          <Route path='/Users/:id' element={<UserProfile/>} />
        </Routes>
    </div>
  )
}

export default RouteList;