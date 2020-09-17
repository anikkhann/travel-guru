import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header/Header';
import fakeData from '../../fakeData/index';
import { Form } from 'react-bootstrap';
import { Button} from '@material-ui/core';

const Book = () => {
    const { travelId } = useParams();
    const bookData = fakeData.find(data => data.id === travelId);
    console.log(bookData);
    const { name, description, origin, destination, id } = bookData;

    return (
        <div className="home-image">
            <div>
                <Header></Header>

            </div>
            <div className="container">
                <div className="row" style={{ color: 'white', marginTop: '100px' }}>
                    <div className="col-md-6">
                        <h1 >
                            {name}
                        </h1>
                        <br />
                        {description}
                    </div>
                    
                    <div className="col-md-6 bg-white"  style={{border:'1px solid white', borderRadius:'5px'}}>
                      
                        <Form>
                            <Form.Group>
                                <Form.Label style={{color:'gray'}}>Origin</Form.Label>
                                <Form.Control type="text" placeholder={origin} disabled/>
                            </Form.Group>

                            <Form.Group >
                                <Form.Label style={{color:'gray'}}>Destination</Form.Label>
                                <Form.Control type="text" placeholder={destination} disabled/>
                            </Form.Group>
                            <Form.Group >
                                <div className="d-flex justify-content-between">
                                   <div>
                                       <Form.Label style={{color:'gray'}}>From</Form.Label>
                                       <Form.Control  type="date" placeholder={destination} />
                                   </div> 
                                    <div>
                                        <Form.Label style={{color:'gray'}}>To</Form.Label>
                                        <Form.Control type="date" placeholder={destination} />
                                    </div>
                                    
                                </div>
                              
                            </Form.Group>
                            <div className=" d-flex justify-content-center" style={{fontWeight:'bold', borderRadius:'10px' ,backgroundColor:'#ffc107'}}>
                         <Link to={`/destination/${id}`}>  
                            <Button>
                                <p>Start Booking</p>
                            </Button>
                        </Link>
                            
                            </div>
                            <br/>
                            
                        </Form>
                 </div>

                 



                </div>
            </div>

        </div>



    );
};

export default Book;