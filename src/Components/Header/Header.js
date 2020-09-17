import React from 'react';
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../Logo.png';

const Header = () => {
    return (
        <div>
            <Navbar bg="none">
            <Navbar.Brand href="#home" style={{marginLeft:'140px'}}>
                
                    <img style={{ width: '100px', color:'white', filter:'contrast(0%) brightness(500%)'}}
                        src={logo}
                        
                        alt="React Bootstrap logo"
                    />
             </Navbar.Brand >        
               
                <Form inline style={{ marginLeft:'70px',weight:'70px'}}>
                <FormControl  type="text" placeholder="Search Your  Destination"  className="mr-sm-2" /> 
                  
                </Form>
                <Nav  >
                    <Nav.Link to="/news" style={{marginLeft:'45px', color:'white', fontWeight:'600'}} href="#home">News</Nav.Link>
                    <Nav.Link to="/destination" style={{marginLeft:'50px', color:'white', fontWeight:'600'}} href="#features">Destination</Nav.Link>
                    <Nav.Link to="/blog" style={{marginLeft:'50px', color:'white', fontWeight:'600'}} href="#pricing">Blog</Nav.Link>
                    <Nav.Link to="/contact" style={{marginLeft:'50px', color:'white', fontWeight:'600'}} href="#features">Contact</Nav.Link>
                    <Link to="/login"><Button style={{marginLeft:'50px', width:'80px', height:'40px', borderRadius:'10px', fontWeight:'600'}} variant="warning">Login</Button></Link> 
                </Nav>
            </Navbar>
        </div>
    );
};

export default Header;