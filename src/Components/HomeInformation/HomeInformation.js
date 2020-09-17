import React from 'react';
import { Link } from 'react-router-dom';

const HomeInformation = (props) => {
    const { img, id, name } = props.data;
    console.log(id);
    return (
        <div className=" row">
            <div className="container" style={{ marginTop: '140px', marginLeft: '80px' }} >
                <div className="col-md-3">
                    <div>
                        <div>
                            <Link to={`/book/${id}`}> 
                            <img 
                            style={{ width: '200px', height: '350px', position: 'relative', border:'3px solid gold', borderRadius:'20px' }}
                            src={img} alt="ops sorry!!" /> 
                            </Link>
                            
                        </div>

                        <div style={{ position: 'absolute', top:'85%', color:'white', marginLeft:'3px' }}>

                            <h6>{name}</h6>
                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
};

export default HomeInformation;
