import React, { useState, useEffect }  from 'react';
import '../../component/style.css';
import Navbar from '../../component/Navbar'
import { useNavigate } from 'react-router-dom';
import TableProd from '../../component/TableProd';
import { dataProduct } from '../../DataDummy/DataProd';
import { useQuery, useMutation } from 'react-query';
import { API } from '../../Config/api';



const Product = (Props) => {
    const title = "List Product";
    document.title = "DumbMerch | " + title;
    const navigate = useNavigate();

    let { data: products } = useQuery('productsCache', async () => {
        const response = await API.get('/products');
        return response.data.data;
      });
     
    return (
       <div>
           <div>
           <Navbar/>
           </div>

           <div>
               <div className="container">
                   <div className="row text-white mt-5 mb-2">
                       <div className="col-10">
                        <h4>List Product</h4>
                        </div>
                        <div className="col" style={{marginLeft : "120px"}}>
                                <button className='buttonADD' onClick={()=> navigate('/add-product')}>Add</button>
                        </div>
                    </div>
                    
                    <table className="table table-striped table-dark">
                            <thead>
                                <tr>
                                <th scope="col">No</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Desk</th>
                                <th scope="col">Price</th>
                                <th scope="col">Qty</th>
                                <th scope="col" className="col-3">Action</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {products?.map((item, index) => {
                                    return (
                                    <TableProd item={item} key={index} number={index+1}/>
                                    )
                                })}
                                
                                
                                
                            </tbody>
                            </table>
               </div>
           </div>
           </div>
    )
}
export default Product;