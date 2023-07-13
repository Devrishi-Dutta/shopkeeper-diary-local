import React, { useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  
  useEffect(()=>{
    const auth=localStorage.getItem('users');
    if(auth){
      navigate('/');
    }
  })

  const storeData = async () => {
    
    let result = await fetch(`${process.env.REACT_APP_API}/register`, {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("users",JSON.stringify(result.newuser));
    localStorage.setItem("token",JSON.stringify(result.auth));
    if(result){
      navigate('/');
    }
  }
  return (
    <div className='signup'>
      <h3>SignUp</h3>
      <input className='inputbox' type='text'
        value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' />

      <input className='inputbox' type='email'
        value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />

      <input className='inputbox' type='password'
        value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />

      <button type='button' onClick={storeData} className='inputboxButton'>SignUp</button>
    </div>
  )
}
export default SignUp;