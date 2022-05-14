import React, { useEffect, useState } from 'react';
import '../../component/style.css';
import NavbarUser from '../../component/NavbarUser';
import { useNavigate, useParams } from 'react-router-dom';

import convertRupiah from 'rupiah-format';
import { API } from '../../Config/api';

const DetailPage = () => {

  const title = "Detail Product";
  document.title = "DumbMerch | " + title;

  const navigate = useNavigate()
  const { id } = useParams();


  const [product,setProduct]=useState('')


  const getProduct =  async() => {
    try {
      const response = await API.get("/product/" + id);
      console.log(response);
      setProduct(response.data.data)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getProduct()
  },[])

  useEffect(() => {
    //change this to the script source you want to load, for example this is snap.js sandbox env
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    //change this according to your client-key
    const myMidtransClientKey = "SB-Mid-client-YFY4KOLjGFVPvIVW";
  
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    // optional if you want to set script attribute
    // for example snap.js have data-client-key attribute
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  console.log(product);




  const handleBuy = async() =>  {
    try {

      const data = {
        idProduct: product.id,
        idSeller: product.user.id,
        price: product.price,
      };
      console.log(data);

      // const body = JSON.stringify(data));
      // console.log(body);

      const response = await API.post('/transaction', data);
      console.log(response);
      const token = response.data.payment.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
       
          console.log(result);
          navigate("/profil");
        },
        onPending: function (result) {
      
          console.log(result);
          navigate("/profil");
        },
        onError: function (result) {
        
          console.log(result);
        },
        onClose: function () {
    
          alert("you closed the popup without finishing the payment");
        },
      });
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div>
        <NavbarUser />
      </div>

      <div>
        <div className="container-fluid mt-4">

          <div className="row justify-content-center mt-5">
            <div className="col-md-3">
              <img src={product?.image} style={{ width: "300px", height: "350px", borderRadius: "5px" }} />
            </div>
            <div className="col-md-3" style={{ fontSize: "12px" }}>
              <div className="row" style={{ fontSize: "12px" }}>
                <h4 style={{ color: "#F74D4D", fontWeight: "bold" }}>{product?.name}</h4>
                <p style={{ color: " #afafaf", fontSize: "11px" }}> stok: {product?.qty}</p>
              </div>

              <div className="row mt-2 text-white" style={{ textAlign: "justify" }}>
                <p> {product?.desc}</p>
              </div>
              <div className="d-flex flex-row-reverse bd-highlight text-danger">
                <p>  {convertRupiah.convert(product?.price)}</p>
              </div>
              <div className="row mt-3" >
                <button className="buttonBuy" onClick={handleBuy}>Buy</button>
              </div>

            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default DetailPage;