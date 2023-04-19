import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import logo from '../../assets/logopanel.png'


export default function VetPortal() {
  return (
    <>
{/* navbar */}
<nav className=" border-gray-200 px-2 sm:px-4 py-2.5 bg-[#2E4960] fixed top-0 left-0 w-full z-40">
  <div className="container flex flex-wrap items-center justify-start mx-auto z-20">
    <Link to="/" className="flex items-center"></Link>
      
    <div className="hidden w-full md:block md:w-auto ml-auto" id="navbar-default">
      <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 ">
        <li>
          <button className="btn">
             Logout
          </button>
        </li>
      </ul>
    </div>
  </div>
</nav>


{/* side bar */}
<button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
   <span class="sr-only">Open sidebar</span>
   <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
   </svg>
</button>

<aside id="default-sidebar" class="fixed top-0 left-0 z-50 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
   <div class="h-full px-3 py-4 overflow-y-auto bg-[#FF9F00]">

   <div>
   <img src={logo} alt="logo" className=" w-[150px] h-[100px] mx-auto"></img>
      <h3 className=" text-[#2E4960] font-bold text-l text-center w-[150px] leading-5 my-2 tracking-wide mx-auto">
        Animal Management
      </h3>
    </div>

   <div className="my-6 ">

   <Link to='dashboard'
       className=" bg-[#2E4960] px-[15px] hover:bg-[#797979] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
       >DASHBOARD</Link>

       <Link to="allpetprofile"
       className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
       >PET PROFILES</Link>

       <Link to="addhealthprofile" 
       className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
       >HEALTH PROFILES</Link>

       <Link to='healthprofile'
       className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
       >HEALTH MONITORING</Link>

   <Link to='spets'
       className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
       >SHELTERING PETS</Link>

       
   <Link to='breed'
       className=" bg-[#2E4960] hover:bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[10px] block w-[150px] text-center mb-7 mx-auto"
       >BREEDS</Link>
   </div>
   </div>

   
      
</aside>
<Outlet/>
    </>
  )
}
