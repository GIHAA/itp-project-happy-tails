import React from 'react'
import logo from "../assets/logo.png"
import warehouse from "../assets/warehouse.png"
import logout from "../assets/logout.png"
import { Link, NavLink } from 'react-router-dom';

function InventorySideBar() {
  return (

    <div className=" bg-[#FF9F00] h-[100vh] flex-[15%] sticky top-0">
      
      
    <div>
      <img src={logo} alt="logo" className=" w-[100px] h-[100px] mx-auto object-contain"></img>
      <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
        INVENTORY MANAGEMENT
      </h3>
    </div>

    
    <div className="my-6 ">

        <NavLink to='/inventory' activeclassname ="active"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >Dashboard</NavLink>

        <NavLink to='/items' activeclassname ="active"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >ITEMS</NavLink>

        <NavLink to='/stockin' activeclassname =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >STOCK DETAILS</NavLink>

        <NavLink to='/releasestock' activeclassname =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >RELEASE STOCKS</NavLink>

        <NavLink to='/requeststock' activeclassname =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] text-center mb-7 mx-auto"
        >REQUSET STOCKS</NavLink>

    </div>

    <div>

      <button 
        className="flex items-center px-5 py-1 ml-12 mr-5 mt-[105px] bg-[#ffffff] text-[#2E4960] shadow-lg font-semibold hover:bg-[#818181] hover:text-white rounded-xl">
        <img src={logout} alt="Logout" className="w-4 h-4 mr-2" />
        <span>Logout</span>
      </button>


    </div>
  
</div>
   
  )
}

export default InventorySideBar