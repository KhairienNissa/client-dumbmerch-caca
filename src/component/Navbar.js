import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../component/style.css'
import frame from "../Assets/images/Frame.png"
import { UserContext } from '../context/userContext';




const Navbar = () => {
  let url = window.location.href;
  let host = window.location.host;
  let final_url = url.replace(`http://${host}`, "");

  function changeTheme () {
    let elemet = document.body
    elemet.classList.toggle("light-theme")
}
  
  let navigate = useNavigate();
  const [context, dispatch] = useContext(UserContext)

  const logout = () => {
    console.log(context)
    dispatch({
        type: "LOGOUT"
    })
    navigate("/login")
}

return (

    <div>
          <nav className="navbar navbar-expand-lg navbar-dark text-white shadow-sm"  >
          <div className="container-fluid px-5 pt-2">
        <img src={frame} width="65px"/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item me-4">
                  <NavLink
                  aria-current="page" className={
                    final_url === "/complain-admin" ? "nav-link hello text-danger fw-bold" :"nav-link hello text-white "}
                    to="/complain-admin"exact >
                   Complain
                  </NavLink>
              </li>
              <li className="nav-item me-4">
              <NavLink
                  aria-current="page" className={
                    final_url === "/category" ? "nav-link hello text-danger fw-bold" :"nav-link hello text-white "}
                  to="/category"
                  exact >
                  Category
                  </NavLink>
            </li>
            <li className="nav-item me-4">
                 <NavLink
                  aria-current="page" className={
                    final_url === "/list-product" ? "nav-link hello text-danger fw-bold" :"nav-link hello text-white "}
                  to="/list-product"
                  exact >
                  Product
                  </NavLink>
            </li>
            <li
                  aria-current="page" className="nav-link  hello text-white"
                  exact onClick={logout} >
                  Logout
               
              </li>
              <li className="nav-item mt-2">
              
                  <i className='bx bxs-circle-half fs-4 change-theme hello cursor-pointer' id="theme-button" onClick={changeTheme} ></i>
              
            </li>
               
            </ul>
          </div>
        </div>
      </nav>
    </div>
)
}

export default Navbar;
