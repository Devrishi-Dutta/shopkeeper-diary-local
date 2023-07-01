import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const AddSeller = () => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [paymentDue, setpaymentDue] = useState("");
    const [company, setCompany] = useState("");
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const addSeller = async () => {
        if (!name || !contact || !company || !paymentDue) 
        {
            setError(true);
             return false;
        }

        const userId = JSON.parse(localStorage.getItem('users'))._id;
        let result = await fetch("http://localhost:5000/add-seller", {
            method: 'post',
            body: JSON.stringify({ name,contact, paymentDue, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/sellers');
    }
    return (
        <div className='addproduct'>
            <h3>Add Seller</h3>
            {error && !name && <span className='adderror'>Enter a valid name</span>}
            <input type='text' placeholder='enter seller name' className='inputbox' value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !contact && <span className='adderror'>Enter a valid contact</span>}
            <input type='text' placeholder='enter contact number' className='inputbox' value={contact} onChange={(e) => { setContact(e.target.value) }}
            />
            {error && !paymentDue && <span className='adderror'>Enter a valid amount</span>}
            <input type='text' placeholder='enter payment due ' className='inputbox' value={paymentDue} onChange={(e) => { setpaymentDue(e.target.value) }}
            />
            {error && !company && <span className='adderror'>Enter a valid company</span>}
            <input type='text' placeholder='enter seller company' className='inputbox' value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            <button onClick={addSeller} className='inputboxButton'> Add Seller</button>
        </div>
    );
}
export default AddSeller;