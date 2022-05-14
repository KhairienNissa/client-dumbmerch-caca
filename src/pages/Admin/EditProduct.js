import React, {useState, useEffect} from 'react';
import '../../component/style.css';
import Navbar from '../../component/Navbar';
import CheckBox from '../../component/form/Checkbox';

import { API } from '../../Config/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';


const EditProduct = () => {
    
  const title = "Edit Product";
  document.title = "DumbMerch | " + title;

    
  let navigate = useNavigate();
  const { id } = useParams();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: '',
    name: '',
    desc: '',
    price: '',
    qty: '',
  }); //Store product data

  // Fetching detail product data by id from database
  useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    setPreview(response.data.data.image);
    setForm({
      ...form,
      name: response.data.data.name,
      desc: response.data.data.desc,
      price: response.data.data.price,
      qty: response.data.data.qty,
    });
    setProduct(response.data.data);
  });

  // Fetching category data
  useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    setCategories(response.data.data);
  });

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

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

  // Handle change data on form
  const HandleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const HandleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set('image', form?.image[0], form?.image[0]?.name);
      }
      formData.set('name', form.name);
      formData.set('desc', form.desc);
      formData.set('price', form.price);
      formData.set('qty', form.qty);
      formData.set('categoryId', categoryId);

      // Insert product data
      const response = await API.patch(
        '/product/' + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate('/list-product');
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

    return (
        <div>
            <div>
                <Navbar/>
            </div>
            
        <div className="container-fluid" style={{width: "1000px",padding : "0px 50px"}}>
            <form onSubmit={(e) => HandleOnSubmit.mutate(e)}>
                <div className="m-4 text-white text-center">
                    <h2>Edit Product</h2>
                </div>

                <div className="row">
                    <div className="col-1 mx-5">
                        <div className="buttonMerah text-center"> <input type="file" id="upload" name="image" onChange={HandleOnChange} hidden />   <label htmlFor="upload" className="label-file-add-product text-center mt-2">
                Upload file
              </label></div>
                    </div>
                    <div className="col ms-5 text-white">
                    {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: '150px',
                      maxHeight: '150px',
                      objectFit: 'cover',
                    }}
                    alt="preview"
                  />
                </div>
              )}
                    </div>


                </div>


                <div className="row mx-5 mt-3">
            <input type="text" className="form-control input-category-product" name="name"  onChange={HandleOnChange} value={form?.name}/>
          </div>
          <div className="row mx-5 mt-3">
            <input type="text" style={{height:"100px"}} className="form-control input-category-product" name="desc"   onChange={HandleOnChange}value={form?.desc} />
          </div>
          <div className="row mx-5 mt-3" >
            <input style={{ backgroundColor: "#BCBCBC", paddingTop: "40px", paddingBottom: "40px" }} type="number" className="input-category-product form-control"  name="price" onChange={HandleOnChange} value={form?.price} />
          </div>
          <div className="row mx-5 mt-3">
            <input type="number" className="form-control input-category-product" id="exampleInputEmail1" name="qty" onChange={HandleOnChange} value={form?.qty}/>
          </div>

          <div className="card-form-input mt-2 px-2 py-1 pb-2 ms-5">
            <div
              className="mb-1"
              style={{ fontSize: '16px', fontWeight: "bold", color: "white" }}
            >
              Category
            </div>
            {product &&
                  categories?.map((item, index) => (
                    <label key={index} className="checkbox-inline me-4">
                      <CheckBox
                        categoryId={categoryId}
                        value={item?.id}
                        handleChangeCategoryId={handleChangeCategoryId}
                      />
                      <span className="ms-2">{item?.name}</span>
                    </label>
                  ))}
          </div>
                <div className="row mx-5 mt-5 mb-4">
                    <button type="submit" className="buttonSave">Save</button>
                </div>
            </form>
            </div>
            </div>
    )
}

export default EditProduct;