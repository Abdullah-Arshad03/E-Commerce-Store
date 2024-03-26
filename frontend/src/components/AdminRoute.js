import React from "react";
import { useSelector } from "react-redux";
import { Outlet , Navigate } from "react-router-dom";

const AdminRoute = () =>{

    const {userInfo} = useSelector((state)=>state.auth)
    return(<>

    {userInfo && userInfo.isAdmin ? (<><Outlet></Outlet></>) : (<>

    <Navigate to='/login'></Navigate>
    
    </>)}
    
    </>)
}

export default AdminRoute