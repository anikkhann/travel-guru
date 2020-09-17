import React from 'react';
import { useParams } from 'react-router-dom';

import fakeData from '../../fakeData/index';
import Header from '../Header/Header';
const Destination = () => {
    const {destinationId} = useParams();
    const hotelInformation = fakeData.find(data => data.id === destinationId );
    const {name} = hotelInformation;
    return (
        <div>
             <div className="home-image">
            <div>
                <Header></Header>
                
            </div>
           
            
           
        </div>
        </div>
    );
};

export default Destination;