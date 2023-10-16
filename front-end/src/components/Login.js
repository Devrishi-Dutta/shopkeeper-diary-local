import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
        const auth = localStorage.getItem("users");
        if (auth) {
            navigate("/");
        }
    });
    const searchLogin = async () => {
        let result = await fetch(`http://localhost:5000/login`, {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.auth) {
            localStorage.setItem("users", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate("/");
        }
        else {
            alert("please enter correct details");
        }
    }
    return (
        <div className='signup'>
            <h1>Login</h1>
            <input className='inputbox' type='text' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
            <input className='inputbox' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
            <button type='button' className='inputboxButton' onClick={searchLogin}>Login</button>
        </div>
    )
}
export default Login;