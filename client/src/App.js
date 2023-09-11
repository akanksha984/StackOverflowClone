import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router} from 'react-router-dom'
import RouteList from "./RouteList"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllQuestions } from './actions/question';
import { getAllUsers } from './actions/users';

function App() {
  const dispatch= useDispatch();
  useEffect(()=>{
    dispatch(fetchAllQuestions());
    dispatch(getAllUsers());
  },[dispatch])
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <RouteList/>
      </Router>
    </div>
  );
}

export default App;
