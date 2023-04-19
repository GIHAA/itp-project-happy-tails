import React from "react"
import SupplierSideBar from "./SupplierSideBar"
import { Link } from 'react-router-dom';

export default function SupplierList() {
    return (

    <div className="flex scroll-smooth">
     < SupplierSideBar/>
       <div className="bg-[#2E4960] h-100 w-full">
          <h1 className="text-white font-bold text-3xl leading-5 tracking-wide 
           pt-5 pl-5 ">DASHBOARD</h1>
       </div>
   </div>

    )
}