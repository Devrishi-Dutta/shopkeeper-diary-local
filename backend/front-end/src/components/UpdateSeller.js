import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateSeller = () => {
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [paymentDue, setpaymentDue] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const getSellerDetails = async () => {
        let result = await fetch(`${process.env.REACT_APP_API}/seller/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setContact(result.contact);
        setpaymentDue(result.paymentDue);
        setCompany(result.company);
    }

    useEffect(() => {
        getSellerDetails();
    }, []);


    const updateSeller = async () => {
        let result = await fetch(`${process.env.REACT_APP_API}/seller/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, contact , paymentDue, company }),
            headers: {
                'Content-Type': "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
       console.log(result);
        navigate('/sellers');
    }
    return (
        <div className='updateProduct'>
            <h1>Update Seller</h1>

            <input type='text' placeholder='enter seller name' className='inputbox' value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type='text' placeholder='enter contact number' className='inputbox' value={contact} onChange={(e) => { setContact(e.target.value) }}
            />

            <input type='text' placeholder='enter payment due' className='inputbox' value={paymentDue} onChange={(e) => { setpaymentDue(e.target.value) }}
            />

            <input type='text' placeholder='enter product company' className='inputbox' value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            <button onClick={updateSeller} className='inputboxButton'> Update Seller</button>
        </div>
    );
}
export default UpdateSeller;