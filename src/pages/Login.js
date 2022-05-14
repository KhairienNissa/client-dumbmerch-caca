import React, {useState, useContext} from 'react';
import '../component/style.css';
import { useNavigate, NavLink } from 'react-router-dom';
import frame from  '../Assets/images/Frame.png';
import { Alert } from 'react-bootstrap';
import { API } from '../../src/Config/api';
import { useMutation } from 'react-query';
import { UserContext } from '../context/userContext';


const Login = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState(null)

  const [context, dispatch] = useContext(UserContext)

  console.log(context)


  const [state, setState] = useState ({
    email : '',
    password : ''
  })

  const HandleOnChange = (event) =>{
      setState({
        ...state,
        [event.target.name] : event.target.value
      })
  }
  const HandleOnsubmit = useMutation(async (event) => {
        try {
          event.preventDefault();
  
          // Configuration Content-type
          const config = {
            headers: {
              'Content-type': 'application/json',
            },
          };
      
          // Data body
          const body = JSON.stringify(state);
      
          // Insert data user to database
          const response = await API.post('/login', body, config);
    
          console.log(response);
          
          if (response?.status === 200) {
            // Send data to useContext
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: response.data.data,
            });
    
            // Status check
            if (response.data.data.status === 'admin') {
              navigate('/complain-admin');
            } else {
             navigate('/');
            }
    
            const alert = (
              <Alert variant="success" className="py-1">
                Login success
              </Alert>
            );
            setMessage(alert);
          } else {
            const alert = (
              <Alert variant="danger" className="py-1">
                Login failed
              </Alert>
            );
            setMessage(alert);
          }
        } catch (error) {
          const alert = (
            <Alert variant="danger" className="py-1 alertfailed">
              Login failed!
            </Alert>
          );
          setMessage(alert);
          console.log(error);
        }
      });
    
      return (
        <div>
            <div className="container" style={{margin : "80px 130px"}}>
              <div className="row mt-5 justify-content-center">
                  {/* bagian kiri */}

                 <div className="col-md-6">
                      <img src={frame} width="300" height="300"/>
                   <div className="row text-white mt-3">
                     <h1> Easy, Fast and Reliable</h1>
                   </div>

                   <div className="row mt-2">
                     <p>Go shopping for merchandise, just go to dumb merch shopping. the biggest merchandise in Indonesia</p>
                   </div>
                     <div className="row mt-4">
                        <div className="col-md-3">
                             <button className='buttonMerah' onClick={() =>  navigate('/category ')}>login</button>
                        </div>
                        <div className="col-md-3 ">
                        <NavLink
                        aria-current="page" className="nav-link text-white"
                        to="/register"
                        exact >
                        Register
                        </NavLink>
                        </div>
                     </div>
                 </div>

                  {/* penutup */}

                  {/* bagian kanan login */}
                <div className="col-md-6">
                   
                    <div className="row row-cols-1 row-cols-md-2 justify-content-center mt-5">
                       
                         <div className="col mb-4">  
                         {message && message}
                             <div className=" row card-bg1 bg-card" >
                               
                                  <h2 className="text-white mb-5">Login</h2>
                                 
                                   <form onSubmit={(event)=> HandleOnsubmit.mutate(event)}>
                                    
                      
                                         <div className="row mb-4 justify-content-center">
                                              <input type="email" className="text-white form-input" id="exampleFormControlInput1" placeholder="email" name="email" value={state.email} onChange={HandleOnChange}/>
                                         </div>
                                         <div className="row mb-5">
                                              <input  type="password" className="text-white form-input" id="exampleFormControlInput1" placeholder="password" name="password" value={state.password} onChange={HandleOnChange} />
                                         </div>
                                         <div className="row">
                                             <button type="submit" className="btn btn-lg btn-block fs-6 text-white" style={{background: "#F74D4D"}}>Login</button>
                                         </div>
                                     
                                </form>
                              
                         </div>
                     </div>
                </div>
            </div>
                {/* bagian penutup */}


             </div>
        </div>
     </div>
    )
}
export default Login;