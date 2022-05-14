import React, {useState} from 'react';
import '../../component/style.css';
import Navbar from '../../component/Navbar'
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../Config/api';

const AddCategory = () => {

  const title = "Add Category";
  document.title = "DumbMerch | " + title;

    const navigate = useNavigate()
    const [state, setState] = useState('')
    
      const HandleOnChange = (event) =>{
          setState(event.target.value)
      }
    
        const HandleOnsubmit = useMutation (async (event) => {
            try {
                event.preventDefault();
                // Configuration
                const config = {
                  headers: {
                    'Content-type': 'application/json',
                  },
                };
          
                // Data body
                const body = JSON.stringify({ name: state });
          
                // Insert category data
                const response = await API.post('/category', body, config);
          
                navigate('/category');
              } catch (error) {
                console.log(error);
              }
            });

    return (
        <div>
            <div>
                <Navbar/>
            </div>
            
            <div>
            <div className="container-fluid" style={{ width: "1000px",padding : "20px 50px"}}>
            <form onSubmit={(event)=> HandleOnsubmit.mutate(event)}>
                <div className="m-5 text-white text-center">
                    <h2>Add Category</h2>
                </div>

                <div className="m-5">
                    <input type="text" className="form-control input-category-product" aria-describedby="emailHelp"  placeholder="mouse" name="category" value={state} onChange={HandleOnChange}/>
                </div>
                <div className="m-5">
                    <button type="submit" className="buttonSave">save</button>
                </div>
            </form>
            </div>
            </div>
     </div>
    )
}

export default AddCategory;