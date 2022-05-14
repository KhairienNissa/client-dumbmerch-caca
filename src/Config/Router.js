import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login' ;
import Register from '../pages/Register' ;
import Category from '../pages/Admin/Category' ;
import ListProduct from '../pages/Admin/ListProduct' ;
import EditProduct from '../pages/Admin/EditProduct' ;
import Home from '../pages/home' ;
import DetailPage from '../pages/User/DetailPage' ;
import Profil from '../pages/User/Profil' ;
import EditCategory from '../pages/Admin/EditCategory' ;
import ComplainUser from '../pages/User/ComplainUser' ;
import ComplainAdmin from '../pages/Admin/ComplainAdmin' ;
import PrivateRoute from './PrivatRoute';
import AlertDelete from '../component/alert';
import FileNotFound from '../pages/fileNotFound';
import { setAuthToken, API } from './api';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import AddProduct from '../pages/Admin/AddProduct';
import AddCategory from '../pages/Admin/AddCategory';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const Render = () => {

    let navigate = useNavigate();

    const [context, dispatch] = useContext(UserContext);
    // console.clear();
    console.log(context);
    useEffect(() => {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
  
      // Redirect Auth
      if (context.isLogin === false) {
        navigate('/login');
      } else {
        if (context.user.status === 'admin') {
          navigate('/list-product');
        } else if (context.user.status === 'customer') {
          navigate('/');
        }
      }
    }, [context]);
  
    const checkUser = async () => {
      try {
        const response = await API.get('/check-auth');
  
        // If the token incorrect
        if (response.status === 404) {
          return dispatch({
            type: 'AUTH_ERROR',
          });
        }
  
        // Get user data
        let payload = response.data.data.user;
        // Get token from local storage
        payload.token = localStorage.token;
  
        // Send data to useContext
        dispatch({
          type: 'USER_SUCCESS',
          payload,
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      if (localStorage.token) {
        checkUser();
      }
    }, []);
    

 return(

    <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route path='/register'  element={<Register/>}/>
        <Route path='/*' element={<FileNotFound/>}/>
        <Route path='/'  element={<PrivateRoute/>}>
          <Route path='/category' element={<Category/>}/>
          <Route path='/add-category' element={<AddCategory/>}/>
          <Route path='/complain-user' element={<ComplainUser/>}/>
          <Route path='/complain-admin'element={<ComplainAdmin />}/>
          <Route path='/list-product' element={<ListProduct/>}/>
          <Route path='/add-product' element={<AddProduct/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/profil' element={<Profil/>}/>
          <Route path='/edit-category/:id' element={<EditCategory/>}/>
          <Route path='/edit-product/:id' element={<EditProduct/>}/>
          <Route path='/detail-Page/:id' element={<DetailPage/>}/>
          <Route path='/delete' element={<AlertDelete/>}/>
        </Route>

    </Routes>
      
 )
}

export default Render;






















// // import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// // import Category from '../pages/Category';
// // import Complain from '../pages/Complain';
// // import ComplainByAdmin from '../pages/ComplainByAdmin';
// // import ComplainPage from '../pages/ComplainPage';
// // import EditCategory from '../pages/EditCategory';
// // import EditProduct from '../pages/EditProduct';
// // import Login from '../pages/Login';
// // import Product from '../pages/Product';
// // import Profil from '../pages/Profil';
// // import Register from '../pages/Register';
// // import ProductShop from '../pages/ProductShop';


// //         <Router>
// //             <Routes>
// //                 <Route path='/Login'>
// //                     <Login/>
// //                 </Route>
// //                 <Route path='/Register'>
// //                     <Register/>
// //                 </Route>
// //                 <Route path='/Category'>
// //                     <Category/>
// //                 </Route>
// //                 <Route path='/Complain'>
// //                     <Complain/>
// //                 </Route>
// //                 <Route path='/ComplainByAdmin'>
// //                     <ComplainByAdmin/>
// //                 </Route>
// //                 <Route path='/ComplainPage'>
// //                     <ComplainPage/>
// //                 </Route>
// //                 <Route path='/Product'>
// //                     <Product/>
// //                 </Route>
// //                 <Route path='/ProductShop'>
// //                     <ProductShop/>
// //                 </Route>
// //                 <Route path='/Profil'>
// //                     <Profil/>
// //                 </Route>
// //                 <Route path='/EditCategory'>
// //                     <EditCategory/>
// //                 </Route>
// //                 <Route path='/EditProduct'>
// //                     <EditProduct/>
// //                 </Route>
// //             </Routes>
// //         </Router>
      