import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    const navigate= useNavigate();
    useEffect(() => {
        getSellers();
    }, []);

    const getSellers = async () => {
        const userId = JSON.parse(localStorage.getItem('users'))._id;
        let result = await fetch(`http://localhost:5000/sellers/${userId}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        let arrayResult = Array.from(result);
        setSellers(arrayResult);
    }
    const deleteSeller = async (id) => {
        let result = await fetch(`http://localhost:5000/seller/${id}`, {
            method: "Delete",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            getSellers();
        }
    }

    const searchHandle= async (e)=>{
        let key = e.target.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search2/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        if(result){
            setSellers(result);
        }
        }
        else{
            getSellers();
        }
        
    }

    return (
        <div className='product-list'>
            <h2>Seller List</h2>
            <input className='searchbar' type="text" onChange={searchHandle} placeholder="Search Seller"/>
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Contact</li>
                <li>Payment Due</li>
                <li>Company</li>
                <li>operation</li>
            </ul>
            {
               sellers.length>0 ? sellers.map((item, index) => (
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.contact}</li>
                        <li>{item.paymentDue}</li>
                        <li>{item.company}</li>
                        <li>
                         <button className="del_btn" onClick={() => deleteSeller(item._id)}>Delete </button>
                          <button className="update_btn" onClick={()=> navigate("/updateseller/"+item._id)}>Update</button>       
                        </li>
                    </ul>
                ))
                :<h1>No Result Found</h1>

            }
        </div>
    );
}
export default Sellers;