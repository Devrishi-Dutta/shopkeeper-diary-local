import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    const getProductDetails = async () => {
        let result = await fetch(`${process.env.REACT_APP_API}/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }

    useEffect(() => {
        getProductDetails();
    }, []);


    const updateProduct = async () => {
        let result = await fetch(`${process.env.REACT_APP_API}/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
       console.log(result);
        navigate('/');
    }
    return (
        <div className='updateProduct'>
            <h1>Update Product</h1>

            <input type='text' placeholder='enter product name' className='inputbox' value={name} onChange={(e) => { setName(e.target.value) }}
            />

            <input type='text' placeholder='enter product price' className='inputbox' value={price} onChange={(e) => { setPrice(e.target.value) }}
            />

            <input type='text' placeholder='enter product category' className='inputbox' value={category} onChange={(e) => { setCategory(e.target.value) }}
            />

            <input type='text' placeholder='enter product company' className='inputbox' value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            <button onClick={updateProduct} className='inputboxButton'> Update Product</button>
        </div>
    );
}
export default UpdateProduct;