import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import Home from '../Home/Home';
import { Form } from 'react-bootstrap';
import { Button, FormGroup } from '@material-ui/core';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);  //firebase app name duplicate jeno na hoi tai  if used.
    }

    //google login work
    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email } = result.user;
            const signedInUser = { displayName, email } //result.user theke displayname and email ke alada variable a rakhlam
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
        const faceBookProvider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(faceBookProvider)
        .then(result=> {
            const {email, name, picture} = result.user;
            const signedInUser2 = {email, name, picture};
            setLoggedInUser(signedInUser2);
            history.replace(from);

          })
          .catch(error => {
         
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }

    return (
        <div>
            <div className="home-image">
                <div>
                    <Header></Header>

                </div>

                <div className="container">
                <div className="row justify-content-center" style={{marginTop:'120px', marginLeft:'325px', backgroundColor:'white', border:'1px solid white', borderRadius:'10px', height:'225px', width:'500px'}}>
                <div col-md-6>
                <Form style={{width: '250px', color:'gray'}}>
                     <FormGroup>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control  type="email" placeholder="Username or Email" />
                    </FormGroup>   
                    <FormGroup>   
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </FormGroup>   
                    <Form.Group>
                        <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>
                    
                    <Button style={{marginLeft:'75px', fontWeight:'border', backgroundColor:'#ffc107'}}>
                        Submit
                    </Button>
                    
                    <br/>
                   
                    
                </Form>
                
                <br/>
                  <button onClick={handleGoogleSignIn} style={{width:'70px', height:'30px', color:'red', marginLeft:'40px'}}>
                      <i class="fab fa-google"></i> 
                  </button>

                  <button onClick={handleFaceBookSignIn}
                   style={{width:'70px', height:'30px', color:'blue'}}>
                       <i class="fab fa-facebook"></i>
                   </button> 

                </div>
                </div>
                </div>
                    
                
                </div>

        </div>
       
    );
};

export default Login;