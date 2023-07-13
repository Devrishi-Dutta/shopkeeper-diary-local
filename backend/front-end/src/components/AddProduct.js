import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error,setError]=useState("");
    const navigate=useNavigate();
    const addProduct = async () => {
        if (!name || !price || !company || !category) 
        {
            setError(true);
             return false;
        }

        
        const userId = JSON.parse(localStorage.getItem('users'))._id;
        let result = await fetch(`${process.env.REACT_APP_API}/add-product`, {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
       result = await result.json();
       console.log(result);
        navigate('/');
    }
    return (
        <div className='addproduct'>
            <h3>Add Product</h3>
            {error && !name && <span className='adderror'>Enter a valid name</span>}
            <input type='text' placeholder='enter product name' className='inputbox' value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !price && <span className='adderror'>Enter a valid price</span>}
            <input type='text' placeholder='enter product price' className='inputbox' value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !category && <span className='adderror'>Enter a valid category</span>}
            <input type='text' placeholder='enter product category' className='inputbox' value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !company && <span className='adderror'>Enter a valid company</span>}
            <input type='text' placeholder='enter product company' className='inputbox' value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            <button onClick={addProduct} className='inputboxButton'> Add Product</button>
        </div>
    );
}
export default AddProduct;