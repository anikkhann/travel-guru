import { Card } from '@material-ui/core';
import React from 'react';
import Header from '../Header/Header';
import './Home.css';
import fakeData from '../../fakeData/index';
import HomeInformation from '../HomeInformation/HomeInformation';
const Home = () => {
    return (
        <div className="home-image">
            <div>
                <Header></Header>
                
            </div>
            <div style={{display:'flex', margin:'none'}}>
                {
                    fakeData.map(data =><HomeInformation data={data}></HomeInformation>)
                }
            </div>
            
           
        </div>
    );
};

export default Home;