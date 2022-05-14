import React, { useContext, useState, useEffect } from 'react';
import '../../component/style.css';
import convertRupiah from "rupiah-format";
// import dateFormat from 'dateformat';
import NavbarUser from '../../component/NavbarUser';
import frame from '../../Assets/images/Frame.png'
import imgBlack from '../../Assets/images/Capture.JPG'
import { UserContext } from '../../context/userContext';
import { API } from '../../Config/api'
import { useQuery } from 'react-query';

const Profil = () => {
    const title = "Profile";
    document.title = "DumbMerch | " + title;

    const [context] = useContext(UserContext);

    const [profil,setProfil]=useState('')
    const [transactions,setTransactions]=useState('')

    const getProfile = async() => {
        try {
         
            const response = await API.get("/profile");
            setProfil(response.data.data)

        } catch (error) {
            console.log(error);
        }
    }

    const getTransactions = async() => {
        try {
         
            const response = await API.get("/transactions");
            setTransactions(response.data.data)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getTransactions()
        getProfile()
    },[])


    return (
        <div>
            <div>
                <NavbarUser/>
            </div>
            
            <div>
                <div className="container-fluid">

                    

                    <div className="row justify-content-center mt-4">
                       <div className="col-md-6">
                           <h4 className="text-danger fw-bolder mb-4">My Profile</h4>
                           <div className="row mt-3">
                                <div className="col">
                                    <div className="col-md-3" >
                                     <img variant="top" src={profil?.image ? profil.image : imgBlack} style={{width: "280px",height: "360px"}} />
                                     </div>
                                </div>      
                                <div className="col-md text-white" style={{fontSize: "14px"}}>
                                        <div className="row">
                                            <p className="text-danger fw-bold mb-0">Name</p>
                                            <p>{context.user.name}</p>
                                        </div>
                                        <div className="row">
                                            <p className="text-danger fw-bold mb-0">Email</p>
                                            <p>{context.user.email}</p>
                                        </div>
                                        <div className="row">
                                            <p className="text-danger  fw-bold mb-0">Phone</p>
                                            <p> {profil?.phone ? profil?.phone : '-'}</p>
                                        </div>
                                        <div className="row">
                                            <p className="text-danger fw-bold mb-0">Gender</p>
                                            <p> {profil?.gender ? profil?.gender : '-'}</p>
                                        </div>
                                        <div className="row">
                                            <p className="text-danger fw-bold mb-0">Address</p>
                                            <p>{profil?.address ? profil?.address : '-'}</p>
                                        </div>
                                       
                                </div>      
                           </div>
                       </div>

                       <div className="col-md-4  text-danger">
                           <div className="row">
                             <h4 className="text-danger fw-bolder mb-3">My Transaction</h4> 
                           </div>
                           {transactions?.length !== 0 ? (
                            <div className="row mt-2">
                                {transactions?.map((item, index) => (
                                <div  key={index} className="kotak mb-3">
                                    <div  className="row">
                                    <div  className="col-3 mt-3">
                                    <img src={item.product.image} width= "70px"/>
                                    </div>
                                    <div style={{fontSize: "9px"}} className="col mt-1 text-white">
                                        <div className="row">
                                            <h5 className="text-danger">{item.product.name}</h5>
                                            <p>Price : {convertRupiah.convert(item.price)}</p>

                                        </div>
                                        <div className="row">
                                        <p>Sub Total : {convertRupiah.convert(item.price)}</p>
                                        </div>
                                    

                                    </div>
                                    <div  className="col-3 mt-4 ms-5">
                                    <div
                                        className={`status-transaction-${item.status} rounded h-100 d-flex align-items-center justify-content-center`}
                                    >
                                        {item.status}
                                    </div>
                                    </div>
                                    </div>
                                 </div>
                                  ))}
                            </div>
                           ) : (
                            <div className="no-data-transaction">No transaction</div>
                            )}
                       </div>

                    </div>

                   
                </div>
            </div>
            
        
        </div>
    )
}

export default Profil;