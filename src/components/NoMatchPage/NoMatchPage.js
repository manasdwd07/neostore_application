import React from 'react';
import Header from '../Header/Header';
import noMatch from '../../assets/images/noMatch.jpg';

function NoMatchPage() {
    return (
        <div>
            <Header login={localStorage.getItem('loginUserData') ? 'true' : 'false'} />
            <div className="container-fluid m-4 text-center">
                
                    <img src={noMatch} alt="404 page not found"/>    
                
            </div>

        </div>
    )
}

export default NoMatchPage
