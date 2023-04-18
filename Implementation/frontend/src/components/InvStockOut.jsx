import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import inv from "../assets/inv.jpg"
import InventorySideBar from "./InventorySideBar";


export default function InvStockOut() {

    const [stockReq , setStockReq] = useState([]);

    useEffect(()=>{
  
          axios.get("http://localhost:8080/api/inventory/readreleasestock/")
          .then((res) => {
            setStockReq(res.data)
          })
          .catch(err => alert(err))
  
    }, []) 
  
  return (
    //Main container
    <div className="flex scroll-smooth">
    <InventorySideBar />


  {/*Right Side container start*/}
  <div className="bg-[#d9d9d9] flex-[85%]">

    {/*Header Part*/}
    <div className="bg-[#2E4960] h-100 w-full">
      <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">STOCK DETAILS</h1>

      <div className="flex">

          <div className=" flex p-5">

          <Link to='/stockin' 
          className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
          
          >STOCK IN</Link> 

          <Link to='/stockout' 
          className="bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
          >STOCK OUT</Link> 

          </div>
        </div>
    </div>

    {/*Body Part*/}
    <div 
      style={{ backgroundImage: `url(${inv})` }}
      className="bg-cover bg-center h-screen w-full fixed" >
{/*White box*/}
<div className=" bg-white bg-opacity-90 w-[75%] h-[80%] absolute top-5 left-[80px] overflow-scroll">
                    {/*Table*/}
                    <table className="mx-auto my-10 w-[1000px]">

                    <thead className=" bg-[#FF9F00] text-white sticky top-0">
                        <tr className="hover:bg-[#efeeee]">
                        <th className="p-3">date</th>
                        <th className="p-3">item_code</th>
                        <th className="p-3">item_name</th>
                        <th className="p-3">item_brand</th>
                        <th className="p-3">category</th>
                        <th className="p-3">released qty</th>
                        </tr>
                    </thead>
                    
                    <tbody  className="bg-white text-center">

                    {stockReq.map((stockrequest) => {
                      return(

                        <tr key={stockrequest._id}>
                          <td className="p-3">{stockrequest.date}</td>
                          <td className="p-3">{stockrequest.item_code}</td>
                          <td className="p-3">{stockrequest.item_name}</td>
                          <td className="p-3">{stockrequest.item_brand}</td>
                          <td className="p-3">{stockrequest.category}</td>
                          <td className="p-3">{stockrequest.releaseQty}</td>
        
                      </tr>
                      )
                    })}
                  
                    </tbody>
                    </table>
                </div>

          </div>

  </div> {/*Right Side container end*/}
</div> //Main container end
  )
}

