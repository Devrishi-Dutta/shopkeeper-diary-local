import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate= useNavigate();
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const userId = JSON.parse(localStorage.getItem('users'))._id;
        let result = await fetch(`http://localhost:5000/products/${userId}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        let arrayResult = Array.from(result);
        setProducts(arrayResult);
    }
    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle= async (e)=>{
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        if(result){
            setProducts(result);
        }
        }
        else{
            getProducts();
        }
        
    }

    return (
        <div className='product-list'>
            <h2>Product List</h2>
            <input className='searchbar' type="text" onChange={searchHandle} placeholder="Search Product"/>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Company</li>
                <li>Category</li>
                <li>operation</li>
            </ul>
            {
               products.length>0 ? products.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.company}</li>
                        <li>{item.category}</li>
                        <li>
                         <button className="del_btn" onClick={() => deleteProduct(item._id)}>Delete </button>
                          <button className="update_btn" onClick={()=> navigate("/update/"+item._id)}>Update</button>       
                        </li>
                    </ul>
                ))
                :<h1>No Result Found</h1>

            }
        </div>
    );
}
export default ProductList;