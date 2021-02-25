import React from 'react';

import { useDispatch } from 'react-redux';

import { logout } from '../actions'

function Logout() {
    
    const logoutFunc = () => {
        console.log('signout');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        dispatch(logout());
        
    }

    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={logoutFunc}>Kijelentkezés</button>
        </div>
    );
}

export default Logout;