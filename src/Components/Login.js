import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { login } from '../actions'
//import Authorize from './Authorize';

function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(username);
        console.log(password);
        if (username !=='' && password !=='') {
            let form = {
                username: username,
                password: password
            }
            console.log(JSON.stringify(form))
            fetch('/api/employees/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            }).then(response => {
                response.json().then((data) => {
                    //console.log(data);
                    localStorage.setItem('userId', data.userID);
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('permission', data.permission);
                });
            }).then(() => {
                console.log(localStorage.getItem('userId'));
                console.log(localStorage.getItem('username'));
                console.log(localStorage.getItem('permission'));
                //this.props.connect();
            }).then(() => {
                props.history.push('/api');
                dispatch(login());
            });
        }

    }
    
    const handleUsername = (event) => {
        setUsername(event.target.value);
        console.log(username);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const dispatch = useDispatch();

    return (
        <div>
            <h2>Bejelentkezés</h2>
            <div className="form-content">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <label>Felhasználónév:</label>
                        <input type="text" name="username" onChange={handleUsername} value={username} />
                        <br/>
                        <label>Jelszó:</label>
                        <input type="password" name="password" onChange={handlePassword} value={password} />
                        <br/>
                        <input className="signupbtn" type="submit" value="Bejelentkezés"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);