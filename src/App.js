import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Render from '../src/Config/Router';
// import { setAuthToken, API} from './Config/api';
// import { UserContext } from './context/userContext';
// import { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }
const App = () => {

  // let navigate = useNavigate();

  // const [context, dispatch] = useContext(UserContext);
  // console.clear();
  // console.log(context);
  // useEffect(() => {
  //   if (localStorage.token) {
  //     setAuthToken(localStorage.token);
  //   }

  //   // Redirect Auth
  //   if (context.isLogin === false) {
  //     navigate('/login');
  //   } else {
  //     if (context.user.status === 'admin') {
  //       navigate('/list-product');
  //     } else if (context.user.status === 'customer') {
  //       navigate('/');
  //     }
  //   }
  // }, [context]);

  // const checkUser = async () => {
  //   try {
  //     const response = await API.get('/check-auth');

  //     // If the token incorrect
  //     if (response.status === 404) {
  //       return dispatch({
  //         type: 'AUTH_ERROR',
  //       });
  //     }

  //     // Get user data
  //     let payload = response.data.data.user;
  //     // Get token from local storage
  //     payload.token = localStorage.token;

  //     // Send data to useContext
  //     dispatch({
  //       type: 'USER_SUCCESS',
  //       payload,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.token) {
  //     checkUser();
  //   }
  // }, []);
  
  return (
    <div>
      <Render/>
    </div>
  );
}

export default App;
