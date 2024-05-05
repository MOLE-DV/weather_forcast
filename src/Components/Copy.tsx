import { Link } from 'react-router-dom';
import React from 'react';

function Copy(){
    return(
        <div id='copyright'>
            <Link to='/Copyright'>© Maksymilian Olejnik 2024</Link>
        </div>
    );
}

export default Copy;