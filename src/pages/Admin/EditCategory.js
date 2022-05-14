import React, {useState, useEffect} from 'react';
import '../../component/style.css';
import Navbar from '../../component/Navbar'
import { API } from '../../Config/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

const EditCategory = () => {
  const title = "Edit Category";
  document.title = "DumbMerch | " + title;
  let navigate = useNavigate();
  const { id } = useParams();
  const [category, setCategory] = useState({ name: '' });

  useQuery('categoryCache', async () => {
    const response = await API.get('/category/' + id);
    setCategory({ name: response.data.data.name });
  });

  const HandleOnChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const HandleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const body = JSON.stringify(category);

      const response = await API.patch('/category/' + id, body, config);

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
            <form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
                <div className="m-5 text-white text-center">
                    <h2>Edit Category</h2>
                </div>

                <div className="m-5">
                    <input className="form-control input-category-product" placeholder="category" onChange={HandleOnChange}
                                           value={category.name}/>
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

export default EditCategory;