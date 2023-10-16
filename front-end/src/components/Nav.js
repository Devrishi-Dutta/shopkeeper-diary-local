import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('users');
    let username;
    let userId;
    if(auth){ username = JSON.parse(localStorage.getItem('users')).name;
     userId = JSON.parse(localStorage.getItem('users'))._id;}
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }
    
    return (
        <div>
        
            {auth ? <ul className='Nav-ul '>
                <li className='welcome'>Welcome {username}</li>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/Sellers">Sellers</Link></li>
                <li><Link to="/addseller">Add Seller</Link></li>
                <li><Link to={"/profile/" + userId}>Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout</Link></li>
            </ul>
                :
                <ul className='Nav-ul '>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                </ul>
            }

        </div>
    );
}

export default Nav;