import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Components/Home/Home';
import Book from './Components/Book/Book';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Destination from './Components/Destination/Destination';

export const UserContext = createContext();
function App() {
  const [loggedInUser , setLoggedInUser] = useState({
    name: '',
    email: '',
    password:'',
  });
  
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
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

           <PrivateRoute path="/destination/:destinationId">
              <Destination></Destination>
           </PrivateRoute>
      
      
           
          </Switch>
          
      </Router>

      </UserContext.Provider>
     
  );
}

export default App;
