import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import inv from "../assets/inv.jpg"
import InventorySideBar from "./InventorySideBar";


export default function InvStockIn() {

  const [stockReq , setStockReq] = useState([]);

  useEffect(()=>{

        axios.get("http://localhost:8080/api/inventory/stockrequest/")
        .then((res) => {
          const items = res.data;
          const receivedItems = items.filter((item) => item.status === "received");
          setStockReq(receivedItems);
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
          className=" bg-[#797979] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
          
          >STOCK IN</Link> 

          <Link to='/stockout' 
          className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
          >STOCK OUT</Link> 

          </div>
        </div>
    </div>

    {/*Body Part*/}
    <div 
      style={{ backgroundImage: `url(${inv})` }}
      className="bg-cover bg-center h-screen w-full fixed" >
{/*White box*/}
<div className=" bg-white bg-opacity-90 w-[85%] h-full top-5 left-[80px] overflow-scroll">                    
                    {/*Table*/}
                    <table className="mx-auto my-10 w-[1250px]">

                    <thead className=" bg-[#FF9F00] text-white sticky top-0">
                        <tr>
                        <th className="p-3">date</th>
                        <th className="p-3">item_code</th>
                        <th className="p-3">item_name</th>
                        <th className="p-3">item_brand</th>
                        <th className="p-3">category</th>
                        <th className="p-3">qty</th>
                        <th className="p-3">status</th>
                        </tr>
                    </thead>
                    
                    <tbody  className="bg-white text-center">

                      {stockReq.map((stockrequest) => {
                        return(

                          <TableDataRow 
                          
                            id = {stockrequest._id}
                            itemCode={stockrequest.item_code}
                            itemName={stockrequest.item_name}
                            itemBrand={stockrequest.item_brand}
                            category={stockrequest.category}
                            qty={stockrequest.qty}
                            date={stockrequest.rec_date}
                            status={stockrequest.status}

                          />
                        )
                      })}
                  
                    </tbody>
                    </table>
                    <div className=" h-96"></div>

                </div>

          </div>

  </div> {/*Right Side container end*/}
</div> //Main container end
  )
}



function TableDataRow(props){
 
    return (
      <>
        <tr className="hover:bg-[#efeeee]">
        <td className="p-3">{props.date}</td>
          <td className="p-3">{props.itemCode}</td>
          <td className="p-3">{props.itemName}</td>
          <td className="p-3">{props.itemBrand}</td>
          <td className="p-3">{props.category}</td>
          <td className="p-3">{props.qty}</td>
          <td className="p-3">
            <span className="bg-green-200 text-green-800 inline-block px-2 rounded-xl text-sm ">
              {props.status}
            </span>
          </td>
        
        </tr>
      </>
    )
  }
