import React, { useEffect } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import search from '../../assets/search-solid.svg'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from "../Avatar/Avatar"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'

const Navbar = () => {
    const dispatch= useDispatch();
    useEffect(()=>{
        const token= User?.token;
        //console.log("token = ",token);
        if (token){
            const decodeToken= decode(token);
            //console.log("decoded Token: ",token);
            if (decodeToken.exp * 1000 < new Date().getTime()){
                // token expired
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])
    var User= useSelector((state)=>state.currentUserReducer);
    const navigate= useNavigate();
    const handleLogout= ()=>{
        dispatch({type:"LOGOUT"});
        navigate('/');
        dispatch(setCurrentUser(null));
    }
    return (
        <nav className='main-nav'>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} />
                </Link>
                <Link to='/home' className='nav-item nav-btn'>
                    About
                </Link>
                <Link to='/home' className='nav-item nav-btn'>
                    Products
                </Link>
                <Link to='/home' className='nav-item nav-btn'>
                    For Teams
                </Link>
                <form>
                    <input type='text' placeholder='Search...' />
                    <img src={search} alt="search" width="18" className='search-icon' />
                </form>
                {
                    User===null ? 
                    <Link to='/Auth' className='nav-item nav-links'>Log In</Link>
                    :<>
                        <Link to={`/Users/${User?.result?._id}`}style={{textDecoration: "none"}}>
                            <Avatar
                            backgroundColor="#009dff" px="14px" py="10px" borderRadius="50%" color="white"
                            >
                                {console.log("current user-> ",User)}
                                {User?.result?.name.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                        <button className='nav-item nav-links' onClick={handleLogout}>
                            Log out
                        </button>
                    </>
                }
                
            </div>
        </nav>
  )
}

export default Navbar