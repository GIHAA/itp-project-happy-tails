import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'
import inv from "../assets/inv.jpg"
import InventorySideBar from "./InventorySideBar";
const moment = require('moment');


function InvRequestedStock() {

    const [stockReq , setStockReq] = useState([]);

    useEffect(()=>{
  
          axios.get("http://localhost:8080/api/inventory/stockrequest/")
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
      <h1 className="text-white font-bold text-3xl leading-5 tracking-wide pt-5 pl-5 ">ALL REQUESTS</h1>

      <div className="flex">

          <div className=" flex p-5">

          <Link to='/requeststock' 
          className=" bg-[#E89100] hover:bg-[#8d5f10] px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[100px] text-center mr-2"
          
          >REQUEST</Link> 

          <Link to='/requestedstock' 
          className=" bg-[#797979]  px-[15px] py-[8px] rounded-[120px] font-bold text-white text-[12px] block w-[150px] mr-2"
          >REQUESTED STOCKS</Link> 

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
                        <th className="p-3">action</th>
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
                          date={stockrequest.date}
                          status={stockrequest.status}

                        />
                      )
                    })}
                  
                    </tbody>
                    </table>
                    <div className=" h-32"></div>

                </div>

          </div>

  </div> {/*Right Side container end*/}
</div> //Main container end
  )
}



function TableDataRow(props){
 
  async function handleClick(id, itemCode, newqty){
    console.log(id)
    console.log(itemCode)
    console.log(newqty)

    const now = moment();
    const formatted = now.format('YYYY-MM-DD, h:mm a'); // Returns a formatted date string like "2023-10-10, 4:28 pm"


    try{
      await axios.put(`http://localhost:8080/api/inventory/stockrequest/${id}`, 
      { 
        status: "RECEIVED",
        rec_date: formatted,

    })
      alert("Status Updated !!")

    }catch (err){
      console.error(err);
    }


    try{
      await axios.put(`http://localhost:8080/api/inventory/items/${itemCode}/${newqty}`)
      alert("Qty Updated !!")

    }catch (err){
      console.error(err);
    }

 }
  
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
            <span className={`inline-block px-2 rounded-xl text-sm ${props.status === 'pending' ? 'bg-yellow-200 text-yellow-800' : props.status === 'accepted' ? 'bg-blue-200 text-blue-800' : 'bg-green-200 text-green-800'}`}>  
                {props.status}
            </span>
        </td>
          <td className="p-3">
            {props.status.toLowerCase() === "accepted" ? 
            <button onClick={() =>handleClick( props.id, props.itemCode, props.qty )} className="px-5 py-1 mr-5 bg-[#2E4960] text-white font-semibold hover:bg-[#ffc05a] rounded-xl ">✓ Received</button> : null}
          </td>
        
        </tr>
      </>
    )
  }

export default InvRequestedStock