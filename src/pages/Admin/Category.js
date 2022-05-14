import React from 'react';
import '../../component/style.css';
import Navbar from '../../component/Navbar';
import { useNavigate } from 'react-router-dom';
import TableCategory from "../../component/table"
import { dataCategory } from '../../DataDummy/DataCategory';
import { API } from '../../Config/api';
import { useQuery } from 'react-query';
// import { Table } from 'react-bootstrap';

const Category = () => {
    const title = "List Category";
    document.title = "DumbMerch | " + title;
    const navigate = useNavigate()

    let { data: categories } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.data;
      });
    
    return (
        <>
        <Navbar/>
       <div className="container">
          
       <div className="row text-white mt-5 mb-2">
                       <div className="col-10">
                        <h4>List Category</h4>
                        </div>
                        <div className="col" style={{marginLeft : "120px"}}>
                                <button className='buttonADD' onClick={()=> navigate ('/add-category') }>Add</button>
                        </div>
                    </div>
                    <table className="table table-dark">
                            <thead>
                                <tr>
                                <th scope="col-md-3" >No</th>
                                <th scope="col-md-3">Category Name</th>
                                <th scope="col-md-3" className="col-3">Action</th>
                                </tr>
                            </thead>
                            <tbody> 
                            
                                {categories?.map((item, index) => {
                                return <TableCategory item={item} key={index} number={index+1}/>

                                  })} 
         
                              
                            </tbody>
                            </table>
       </div></>
    )
}
export default Category;