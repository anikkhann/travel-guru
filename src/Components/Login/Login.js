import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { Form } from 'react-bootstrap';
import { Button, FormGroup } from '@material-ui/core';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const [newUser, setNewUser] = useState(false);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);  //firebase app name duplicate jeno na hoi tai  if used.
    }

    //email and password validation work
    const handleBlur = (event) => {
        let isFieldValid = true;
        if(event.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value); ////regular expression /\S+@\S+\.\S+/ diye email validation
        }
        if(event.target.name === 'password'){
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value); //regular expression /\d{1}/ diye pass validation
            //console.log(isPasswordValid && passwordHasNumber);
            isFieldValid = (isPasswordValid && passwordHasNumber);
        }
        if(isFieldValid){
            const newUserInfo = {...loggedInUser};
            newUserInfo[event.target.name] = event.target.value;
            setLoggedInUser(newUserInfo);
        }

    }
    //form submit
    const handleSubmit = (event) => {

        if (newUser && loggedInUser.email && loggedInUser.password){
            //console.log("submitting");
            firebase.auth().createUserWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
            .then(res =>{
                console.log(res);
                const {displayName, email} = res.user;
                const emailUser = {name: displayName, email: email};
              //const newUserInfo = {...loggedInUser};
            //    newUserInfo.error = '';
            //    newUserInfo.success = true;
               setLoggedInUser(emailUser);
               updateUserName(loggedInUser.name);
            //     const signedInUser = {
            //    // isSignedIn: 'true',
            //     name: displayName,
            //     email: email
            //   };
             
             history.replace(from);
              
            })
            .catch(error => {
              // Handle Errors here.
              const newUserInfo = {...loggedInUser};
               newUserInfo.error = error.message;
               newUserInfo.success = false;
              setLoggedInUser(newUserInfo);
              // ...
            });
        }

            if (!newUser && loggedInUser.email && loggedInUser.password){
                //console.log("submitting");
                firebase.auth().signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
                .then(res =>{
                    const {displayName, email} = res.user;
                    const emailUser = {name: displayName, email: email};
                //   const newUserInfo = {...loggedInUser};
                //    newUserInfo.error = '';
                //    newUserInfo.success = true;
                   setLoggedInUser(emailUser);
                   updateUserName(loggedInUser.name);
            //     const signedInUser = {
            //        // isSignedIn: 'true',
            //         name: res.user.displayName,
            //         email: res.user.email
            //   };
            //     setLoggedInUser(signedInUser);
                history.replace(from);
                  
                  
                })
                .catch(error => {
                  // Handle Errors here.
                  const newUserInfo = {...loggedInUser};
                   newUserInfo.error = error.message;
                   newUserInfo.success = false;
                  setLoggedInUser(newUserInfo);
                  // ...
                });
            }
         
       event.preventDefault();
      
    } 


//update user name
    const updateUserName = name => {
        const user = firebase.auth().currentUser;
    
        user.updateProfile({
          displayName: name
        }).then(function() {
          // Update successful.
        }).catch(function(error) {
          // An error happened.
        });
       }

    //google login work
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = {isSignedIn:'true', name: displayName, email: email } //result.user theke displayname and email ke alada variable a rakhlam
            setLoggedInUser(signedInUser);
            history.replace(from);
        console.log(signedInUser);

        }).catch(function (error) {

            const errorMessage = error.message;

            const email = error.email;
            console.log(errorMessage, email);

        });
    }

    //Facebook login work
    
    const handleFaceBookSignIn = () =>{
       
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(fbProvider)
        .then(function(result) {
            const {displayName , email} = result.user;
            const faceBookNewUser = {name : displayName ,  email:email}
            setLoggedInUser(faceBookNewUser);
            history.replace(from);

        }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        });
    }

    return (
        <div>
            <div className="home-image">
                <div>
                    <Header></Header>

                </div>
                

                <div className="container">
                <div className="row justify-content-center" style={{marginTop:'120px', marginLeft:'325px', backgroundColor:'white', border:'1px solid white', borderRadius:'10px', height:'340px', width:'500px'}}>
                <div col-md-6>
                <Form onSubmit={handleSubmit} style={{width: '250px', color:'gray'}}>

                    <Form.Group>
                        <Form.Check type="checkbox" onClick={() => setNewUser(!newUser)} label="Click for Sign up" />
                    </Form.Group>

                    <FormGroup>
                       {newUser &&  <Form.Control type="name" name="name" className="form-control" onBlur={handleBlur} placeholder="Your name" required/> } 
                    </FormGroup>

                     <FormGroup>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control  type="email" name="email" onBlur={handleBlur} placeholder="Username or Email" required/>
                    </FormGroup>

                    <FormGroup>   
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                    </FormGroup>   
                    <br/>
                    
                        <input  style={{marginLeft:'75px', fontWeight:'border', backgroundColor:'#ffc107'}} value="Submit" type="submit"/>
                    
                    
                 
                </Form>
                
                <br/>
                  <button onClick={handleGoogleSignIn} style={{width:'70px', height:'30px', color:'red', marginLeft:'40px'}}>
                      <i class="fab fa-google"></i> 
                  </button>

                  <button onClick={handleFaceBookSignIn}
                   style={{width:'70px', height:'30px', color:'blue'}}>
                       <i class="fab fa-facebook"></i>
                   </button> 
                     
                      {/* <p style={{color:'red'}}>{user.error}</p> */}
                    

                </div>
                </div>
                </div>
                    
                
                </div>

        </div>
       
    );
};

export default Login;