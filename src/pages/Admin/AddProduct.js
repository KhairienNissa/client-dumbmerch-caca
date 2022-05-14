import React, { useState, useEffect } from 'react';
import '../../component/style.css';
import Navbar from '../../component/Navbar';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { API } from '../../Config/api';

const AddProduct = () => {
  const title = "Add Product";
  document.title = "DumbMerch | " + title;
  const navigate = useNavigate()
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
  }); //Store product data

  const getCategories = async () => {
    try {
      const response = await API.get('/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleChangeCategoryId = (event) => {
    const id = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const HandleOnChange = (event) => {
    setForm({
      ...form,
      [event.target.name]:
        event.target.type === 'file' ? event.target.files : event.target.value,
    });

    if (event.target.type === 'file') {
      let url = URL.createObjectURL(event.target.files[0]);
      setPreview(url);
    }
  }

  const HandleOnsubmit = useMutation(async (event) => {
    try {
      event.preventDefault()
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      const formData = new FormData();
      formData.set('image', form.image[0], form.image[0].name);
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      // formData.set('categoryId', categoryId);
      console.log(formData)
      console.log(form);

      //   Insert product data
      const response = await API.post('/product', formData, config);
      console.log(response);

      navigate('/list-product');


    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container-fluid" style={{ width: "1000px", padding: "20px 50px" }}>
        <form onSubmit={(event) => HandleOnsubmit.mutate(event)}>
          <div className="m-5 text-white text-center">
            <h2>Add Product</h2>
          </div>

          <div className="row">
            <div className="col-1 mx-5">
              <button className="buttonMerah"> <input type="file" id="upload" name="image" onChange={HandleOnChange} hidden /> <label for="upload" className='text-center mt-1 mb-1'>upload image</label> </button>
            </div>
            <div className="col ms-5 text-white">
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '100px',
                      maxHeight: '100px',
                      objectFit: 'cover',
                    }}
                    alt={preview}
                  />
                </div>
              )}
            </div>


          </div>


          <div className="row mx-5 mt-3">
            <input  type="text" className="form-control input-category-product" placeholder="Product Name" name="name" onChange={HandleOnChange} />
          </div>
          <div className="row mx-5 mt-3">
            <input style={{height:"100px"}} type="text" className="form-control input-category-product" placeholder="desc" name="desc" onChange={HandleOnChange} />
          </div>
          <div className="row mx-5 mt-3" >
            <input type="number" className="form-control input-category-product" placeholder="price" name="price" onChange={HandleOnChange} />
          </div>
          <div className="row mx-5 mt-3">
            <input  type="number" className="form-control input-category-product" id="exampleInputEmail1" placeholder="stock" name="qty" onChange={HandleOnChange} />
          </div>

          <div className="card-form-input mt-2 px-2 py-1 pb-2 ms-5">
            <div
              className="mb-1"
              style={{ fontSize: '16px', fontWeight: "bold", color: "white" }}
            >
              Category
            </div>
            {categories.map((item, index) => (
              <label style={{ color: "white" }} className="checkbox-inline me-4 text-secondary" key={index}>
                <input
                  type="checkbox"
                  value={item.id}
                  onClick={handleChangeCategoryId}
                />{' '}
                {item.name}
              </label>
            ))}
          </div>
          <div className="row mx-5 mt-3 mb-4">
            <button type="submit" className="buttonSave">Save</button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default AddProduct;