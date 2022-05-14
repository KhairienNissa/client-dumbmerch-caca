import React, {useState} from 'react';
import '../component/style.css';
import { useNavigate } from 'react-router-dom';
import frame from  '../Assets/images/Frame.png'
import { useMutation } from 'react-query';
import { Alert } from 'react-bootstrap';
import { API } from '../../src/Config/api'

const Register = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const [state, setState] = useState ({
    name : '',
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
      const response = await API.post('/register', body, config);

      console.log(response);

      if(response.data.status === "success...")
      { navigate('/login')
        const alert = (
          <Alert variant="success" className="py-1">
            Register Success
          </Alert> 
          
        );
        setMessage(alert)
        
        setState({
          name: '',
          email: '',
          password: '',
        })
        
      }else{
        const alert = (
          <Alert variant="danger" className="py-1 alertfailed">
            Failed
          </Alert>
        );
        setMessage(alert)
      }  
      // Handling response here
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1 alertfailed">
          Failed
        </Alert>
      );
     
      setMessage(alert);
      console.log(error);
    }
  });


 
    return (
        <div>
            <div className="container"  style={{margin : "80px 130px"}}>
              <div className="row mt-5">
                   
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
                             <button onClick={()=> navigate('/login')} className='buttonMerah'>login</button>
                        </div>
                        <div className="col-md-3 ">
                             <a className="nav-link text-white" href="#home">Register</a>
                        </div>
                     </div>
                 </div>

                  {/* penutup */}

                  {/* bagian kanan login */}
                <div className="col-md-6">
                 
                    <div className="row row-cols-1 row-cols-md-2 justify-content-center mt-4">
                         <div className="col mb-4 "> 
                         {message && message}
                             <div className="row card-bg1 bg-card">
                              
                                  <h2 className="text-white mb-5 ">Register</h2>
                                  
                                 <form onSubmit={(event)=> HandleOnsubmit.mutate(event)}>
                                    
                                         <div className="row mb-4">
                                              <input  type="text" className="text-white form-input" id="exampleFormControlInput1" placeholder="name" name="name" value={state.name} onChange={HandleOnChange}/>
                                         </div>
                                         <div className="row mb-4 ">
                                              <input type="email" className=" text-white form-input" id="exampleFormControlInput1" placeholder="email" name="email" value={state.email} onChange={HandleOnChange} />
                                         </div>
                                         <div className="row mb-5">
                                              <input  type="password" className="text-white form-input" id="exampleFormControlInput1" placeholder="password" name="password" value={state.password} onChange={HandleOnChange}/>
                                         </div>
                                         <div className="row">
                                             <button type="submit" className="btn btn-lg btn-block fs-6 text-white" style={{background: "#F74D4D"}}>Register</button>
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
export default Register;