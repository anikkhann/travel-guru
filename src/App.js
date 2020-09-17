import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Book from './Components/Book/Book';
import Login from './Components/Login/Login';


function App() {
  
  return (
    
      <Router>
          
          <Switch>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route path="/book/:travelId">
              <Book></Book>
            </Route>

            <Route path="/login">
              <Login></Login>
            </Route>
      
           
          </Switch>
          
      </Router>
     
  );
}

export default App;
