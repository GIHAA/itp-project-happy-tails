import React from 'react'
import logo from "../assets/logo.png"
import suppliers from "../assets/suppliers.png"
import {  Link, NavLink } from 'react-router-dom';
import { logout, reset } from "../services/auth/authSlice";
import logoutimg from "../assets/logout.png"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function SupplierSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  
  return (
    

    <div className=" bg-[#FF9F00] h-[100vh] flex-[15%] sticky top-0">
      
      
    <div>
      <img src={logo} alt="logo" className=" w-[150px] h-[100px] mx-auto"></img>
      <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
        SUPPLIER MANAGEMENT
      </h3>
    </div>

    
    <div className="my-6 ">
        <NavLink to='/SupplierList' activeClassName="active"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >DASHBOARD</NavLink>

        <NavLink to='/ManageSuppliers' activeClassName=" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >MANAGE SUPPLIERS</NavLink>

        <NavLink to='/stockRequests' activeClassName=" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >STOCK REQUESTS</NavLink>

        <NavLink to='/StockBudgetRequests' activeClassName=" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >REQUEST BUDGET</NavLink>

    </div>

    <div>
    <button onClick={onLogout}
        className="flex items-center px-5 py-1 ml-12 mr-5 mt-[180px] bg-[#ffffff] text-[#2E4960] shadow-lg font-semibold hover:bg-[#818181] hover:text-white rounded-xl">
        <img src={logoutimg} alt="Logout" className="w-4 h-4 mr-2" />
        <span>Logout</span>
      </button>

    </div>
  
</div>
   
  )
}

export default SupplierSideBar





