import React from 'react'
import logo from "../assets/logo.png"
import v from "../assets/v.png"
import { Link, NavLink } from 'react-router-dom';



function VSideBar() {
  return (

    <div className=" bg-[#FF9F00] h-[100vh] flex-[15%] sticky top-0">
      
      
    <div>
      <img src={logo} alt="logo" className=" w-[150px] h-[100px] mx-auto"></img>
      <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
        VEHICLE MANAGEMENT
      </h3>
    </div>

    
    <div className="my-6 ">

      

        <NavLink to='/vhome' activeClassName =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >HOME</NavLink>


        <NavLink to='/vehicledashboard' activeClassName =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >DASHBOARD</NavLink>


        <NavLink to='/vehicles' activeClassName =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >VEHICLES</NavLink>


        <NavLink to='/availability' activeClassName=" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >VEHICLE MAINTENANCE</NavLink>


        <NavLink to='/pending' activeClassName =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >BOOKING REQUESTS </NavLink>

        <NavLink to='/vbudgets' activeClassName =" bg-[#797979]"
        className="link bg-[#2E4960] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
        >BUDGET REQUESTS </NavLink>

        

    </div>

    <div>
      <hr className="mt-[80px] mb-[15px] border-[#2E4960] w-40 mx-auto"></hr>
      <img src={v} className=" w-[140px] h-[140px] mx-auto"></img>
    </div>
  
</div>
   
  )
}

export default VSideBar