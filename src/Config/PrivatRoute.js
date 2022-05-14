import React ,  { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { isLogin } from "../component/IsLogin";
import { UserContext } from "../context/userContext";


const PrivateRoute = () => {

    const [context, dispatch] = useContext(UserContext)

    return (
        context.isLogin ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default PrivateRoute;